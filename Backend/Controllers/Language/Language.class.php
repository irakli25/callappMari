<?php

use Middleware\Routers\dbClass;

class Language extends dbClass
{
    public function __construct()
    {
        parent::__construct();
    }
   
    public function getLanguageList()
    {
       
        parent::setQuery("SELECT `lang`, `key` FROM lang WHERE actived = 1");

        $result = parent::getResultArray()['result'];

        $data = array(array("field" => 'id',  "hidden" => true));

        foreach($result as $key => $value)
        {
            array_push($data, array("field" => $value['lang'], "name" => $value['key'], "size" => 300));
        }

        return $data;
       
    }

    public function getLanguageKeyList()
    {
       
        parent::setQuery("SELECT `lang`, `key` FROM lang WHERE actived = 1");

        $result = parent::getResultArray()['result'];

        $data = array(array("field" => 'id',  "hidden" => true), array("field" => 'კვანძი',  "hidden" => false, "name" => 'KEY_NAME'));

        foreach($result as $key => $value)
        {
            array_push($data, array("field" => $value['lang'], "name" => $value['key']));
        }

        return $data;
       
    }


    /**
     * LANGUAGE PAGE
     */
    public function getTranslationList() {

        parent::setQuery("SELECT `id`, `key` FROM lang WHERE actived = 1");
        $data = parent::getResultArray()['result'];

        $langs = '';

        foreach($data as $lang){
            $langs .= "MAX(IF(`lang_id` = $lang[id],value,'')) AS `$lang[key]`,";
        }

        $langs = rtrim($langs, ',');


        parent::setQuery("  SELECT      `key_id` as `id`, $langs
                            FROM        `lang_value`
                            GROUP BY    `key_id`");

        $result = parent::getResultArray()['result'];

        return $result;

    }

    public function saveTranslation(){

        $data = $_REQUEST['data'];
        $key_id = $_REQUEST['id'];
        $pages = $_REQUEST['pages'];
        $key_name = $_REQUEST['key'];
        $userID = $_SESSION['USERID'];
        $default = $_REQUEST['default'];

        // SAVE TRANSLATION VALUE
        $langs = '';
        foreach($data as $key => $value){

            if($value != ''){
                $langs .= "($userID, NOW(), $key, $key_id, '$value'),";
            }
           
        }
        $langs = rtrim($langs, ',');

        parent::setQuery("INSERT INTO `lang_value` (`user_id`, `datetime`, `lang_id`, `key_id`, `value`) VALUES $langs ON DUPLICATE KEY UPDATE 
                                                                                                        `value` = VALUES(`value`)
                                                                                    ");
        parent::execQuery();

        // SAVE PAGES AND KEY

        if($pages != ''){

            $page_ids = '';

            foreach($pages as $key => $value){

                if($value != ''){
                    $page_ids .= "($userID, NOW(), $value, $key_id),";
                }
            }
    
            $page_ids = rtrim($page_ids, ',');
    
            // DELETE EXISTED ROWS;
            parent::setQuery("DELETE FROM lang_page WHERE key_id = $key_id");
            parent::execQuery();
    
            // INSERT NEW PAGES;
            parent::setQuery("INSERT INTO `lang_page` 
                                                (`user_id`, `datetime`, `page_id`, `key_id`) 
                                        VALUES $page_ids
                            ");
            parent::execQuery();

        }

        if($default == "true"){
            
            parent::setQuery("DELETE FROM `lang_page` WHERE `key_id` = '$key_id' AND `page_id` = 0");
            parent::execQuery();

            parent::setQuery("INSERT INTO `lang_page` (`user_id`, `datetime`, `page_id`, `key_id`) VALUES ($userID, NOW(), 0, $key_id)");
            parent::execQuery();

        }else{
            parent::setQuery("DELETE FROM `lang_page` WHERE `key_id` = '$key_id' AND `page_id` = 0");
            parent::execQuery();
        }

        
        // UPDATE KEY NAME
        if($key_name && $key_name != ''){

            parent::setQuery("UPDATE `lang_key` SET `key` = '$key_name' WHERE `id` = $key_id");
            parent::execQuery();
        
        }


        return array("message" => "OK", "code" => "200");

    }

    /**
     * get not Activated Languages
     * @return array
     */
    public function getUnactivatedLanguages(){

        parent::setQuery("SELECT `id`, `lang`, `key`, `icon` FROM lang WHERE actived = 0");

        $result = parent::getResultArray()['result'];

        return $result;
       
    }

    /**
     * Active Language
     * @action activateLanguage
     * @request lang
     */
    public function ActiveLanguage(){
            
        $lang = $_REQUEST['lang'];

        parent::setQuery("UPDATE `lang` SET `actived` = 1 WHERE `id` = '$lang'");

        parent::execQuery();

        return array("message" => "OK", "code" => "200");

    }


    /**
     * 
     *  LANGUAGE CREATION PAGE
     * 
     */

    public function getCreationList() {

        parent::setQuery("SELECT `id`, `key` FROM lang WHERE actived = 1");
        $data = parent::getResultArray()['result'];

        $langs = '';

        foreach($data as $lang){
            $langs .= "MAX(IF(`lang_id` = $lang[id],value,'')) AS `$lang[key]`,";
        }

        $langs = rtrim($langs, ',');


        parent::setQuery("  SELECT      `lang_key`.`id`, `lang_key`.`key` AS `KEY_NAME`, $langs
                            FROM        `lang_value`
                            RIGHT JOIN  `lang_key` ON `lang_key`.`id` = `lang_value`.`key_id`
                            WHERE       `lang_key`.`actived` = 1
                            GROUP BY    `lang_key`.`id`");

        $result = parent::getResultArray()['result'];

        return $result;

    }


    /**
     * create language key
     */
    public function createKey() {

        $key = $_REQUEST['key'];

        $user_id = $_SESSION['USERID'];

        parent::setQuery("INSERT INTO `lang_key` (`user_id`, `datetime`, `key`) VALUES ('$user_id', NOW(), '$key')");

        parent::execQuery();

        return array("message" => "OK", "code" => "200");

    }

    /**
     * delete language key
     */
    public function deleteKey(){

        $key = $_REQUEST['id'];

        parent::setQuery("UPDATE `lang_key` SET `actived` = 0 WHERE `id` = '$key'");

        parent::execQuery();

        return array("message" => "OK", "code" => "200");

    }



    /**
     * 
     * HANDBOOK TRANSLATION
     * 
     */

    public function getHandbookList(){

    parent::setQuery("SELECT `id`, `name`, `title` as `description` FROM lang_handbook_tables WHERE actived = 1");

    $result = parent::getResultArray()['result'];

    return $result;

    }

    public function getHandbookContent() {

    $tableId    = $_REQUEST['id'];
    $table      = $_REQUEST['table'];


    parent::setQuery("SELECT `id`, `key` FROM lang WHERE actived = 1");
    $data = parent::getResultArray()['result'];

    $langs = '';

    foreach($data as $lang){
        if($lang['id'] != 1){
            $langs .= "MAX(IF(`rows`.`lang_id` = $lang[id],value,'')) AS `$lang[key]`,";
        }
    }

    $langs = rtrim($langs, ',');

    
    parent::setQuery("  SELECT `$table`.`id`, 
                                `$table`.`name` AS `GEO`, 
                                $langs
                        FROM `$table`
                        LEFT JOIN `lang_table_translation` as `rows` ON `rows`.`row_id` = `$table`.`id` AND `rows`.`table_id` = '$tableId'
                        WHERE `$table`.`actived` = 1
                        GROUP BY `$table`.`id`");

    $result = parent::getResultArray()['result'];

    return $result;


    }

    public function addTable(){

    $table = $_REQUEST['table'];
    $desc = $_REQUEST['desc'];

    parent::setQuery("INSERT INTO `lang_handbook_tables` (`name`, `title`) VALUES ('$table', '$desc')");
    parent::execQuery();

    return array("message" => "OK", "code" => "200");


    }

    public function updateHandbookContent(){

        $tableId    = $_REQUEST['tableId'];
        $rowId      = $_REQUEST['rowId'];
        
        $data       = $_REQUEST['data'];
        $userID     = $_SESSION['USERID'];

        $langs = '';

        foreach($data as $key => $value){

            // REMOVE KARTULI FROM LIST
            if($key != 1){
                if($value != ''){
                    $langs .= "($userID, NOW(), $tableId, $rowId, $key, '$value'),";
                }
            }

        }
        $langs = rtrim($langs, ',');

        parent::setQuery("DELETE FROM `lang_table_translation` WHERE `table_id` = '$tableId' AND `row_id` = '$rowId'");
        parent::execQuery();

        if($langs != ''){
            parent::setQuery("INSERT INTO `lang_table_translation` (`user_id`, `datetime`, `table_id`, `row_id`, `lang_id`, `value`) VALUES $langs");
            parent::execQuery();
        }

        

        return array("message" => "OK", "code" => "200");

    }

    public function editTable(){
            
            $tableId    = $_REQUEST['id'];
            $table      = $_REQUEST['name'];
            $desc       = $_REQUEST['description'];
    
            parent::setQuery("UPDATE `lang_handbook_tables` SET `name` = '$table', `title` = '$desc' WHERE `id` = '$tableId'");
            parent::execQuery();
    
            return array("message" => "OK", "code" => "200");
    
    }

    public function deleteTable(){
            
            $tableIds    = parent::ArrayToComma($_REQUEST['id']);
                
            parent::setQuery("UPDATE `lang_handbook_tables` SET `actived` = 0 WHERE `id` IN ($tableIds)");
            parent::execQuery();
    
            return array("message" => "OK", "code" => "200");
    
    }

}