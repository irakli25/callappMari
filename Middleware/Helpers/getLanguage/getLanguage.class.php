<?php


use Middleware\Routers\dbClass;

class getLanguage extends dbClass
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBaseLanguageData()
    {

        $lang_id = @$_SESSION['LANGID'] ? @$_SESSION['LANGID'] : 1;

        parent::setQuery("SELECT        `lang_key`.`key`, 
                                        IF(ISNULL(`lang_value`.`value`), `lang_key`.`key`, value) AS `value`
                                FROM        `lang_key`
                                JOIN        `lang_page`    ON `lang_key`.id = `lang_page`.`key_id`
                                LEFT JOIN   `lang_value`  ON `lang_value`.`key_id` = `lang_page`.`key_id`  AND `lang_value`.`lang_id` = '$lang_id'
                                WHERE       `lang_page`.`page_id` = 0");

        $result = parent::getResultArray();

        $data = array();


        if ($result['count'] > 0) {

            foreach ($result['result'] as $key => $value) {
                $data[$value['key']] = $value['value'];
            }

            return array("langData" => $data);
        } else {
            return array("langData" => null);
        }
    }

    public function getLanguageList()
    {

        parent::setQuery("SELECT `id`, `lang`, `icon`, `key` as `name` FROM lang WHERE actived = 1");

        $data = parent::getResultArray()['result'];

        return $data;
    }

    public function getLanguageKeyById() {

        $keyId = $_REQUEST['id'];

        // GET INPUTS WITH VALUE
        parent::setQuery("SELECT `id`, `lang`, `icon`, `key` as `name` FROM lang WHERE actived = 1");
        $inputs = parent::getResultArray()['result'];

        // GET KEY NAME
        parent::setQuery("SELECT `key` as `name` FROM `lang_key` WHERE id = '$keyId' AND actived = 1");
        $key = parent::getResultArray()['result'];

        // GET DEFAULT PAGE VALUES
        parent::setQuery("SELECT `page_id` FROM `lang_page` WHERE `key_id` = '$keyId' AND `page_id` = 0 AND actived = 1");
        $default = parent::getResultArray();

        if($default['count'] > 0){
            $default = true;
        }else{
            $default = false;
        }
        

        $data = array("inputs" => $inputs, "key" => $key, "default" => $default);

        return $data;

    }

    public function getPagesList() {

        parent::setQuery("SELECT `id`, `name` FROM pages WHERE `name` != '#' AND id NOT IN(1, 2)");
        $data = parent::getResultArray()['result'];

        return $data;

    }

    public function getLangPages() {

        $keyId = $_REQUEST['id'];

        parent::setQuery("SELECT page_id as id FROM lang_page WHERE key_id = '$keyId'");
        $res = parent::getResultArray()['result'];


        $data = array();

        foreach ($res as $key => $value) {
            $data[] = $value['id'];
        }

        
        return $data;

    }

    
}
