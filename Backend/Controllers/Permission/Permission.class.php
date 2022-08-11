<?php

use Middleware\Routers\dbClass;

class Permission extends dbClass
{

    private $response = Array();

    function getMenuData(){
        
        $user_id = $_SESSION['USERID'];
        $group_id = $_REQUEST['group_id'];
        $miss = '';

        
        parent::setQuery(" SELECT   `pages`.`id` as `id`,
                                    `menu_detail`.`name`,
                                    `pages`.`name` AS `page`,
                                    `menu_detail`.`icon`,
                                    `menu_detail`.`sub`,
                                    IFNULL(`group_permission`.`view`,0) as `view`,
                                    IFNULL(`group_permission`.`add`,0) as `add`,
                                    IFNULL(`group_permission`.`save`,0) as `save`,
                                    IFNULL(`group_permission`.`delete`,0) as `delete`,
                                    IFNULL(`group_permission`.`audio`,0) as `audio`,
                                    IFNULL(`group_permission`.`download`,0) as `download`,
                                    IFNULL(`group_permission`.`id`,0) AS `view_page`
                            FROM        `menu_detail`
                            LEFT JOIN    `pages` ON `pages`.id = `menu_detail`.`page_id`
                            LEFT JOIN    `group_permission` ON `pages`.id = `group_permission`.`page_id` AND `group_permission`.group_id = '$group_id'
                            LEFT JOIN   `group` ON `group`.id = group_permission.group_id
                            WHERE   menu_detail.actived = 1 AND menu_detail.parent = 0 AND pages.id IS NOT NULL AND pages.id NOT IN(0)
                            ORDER BY menu_detail.order ASC");
        
        $result = parent::getResultArray();
        
        foreach ($result['result'] AS $row){
            $sub_array = array();
            $data = array(  "page_id"   =>  $row['id'], 
                            "view_page" =>  $row['view_page'],
                            "name"      =>  $row['name'], 
                            "page"      =>  $row['page'], 
                            "icon"      =>  $row['icon'], 
                            "sub"       =>  "", 
                            "view"      =>  $row['view'],
                            "add"       =>  $row['add'],
                            "save"      =>  $row['save'],
                            "delete"    =>  $row['delete'],
                            "audio"    =>  $row['audio'],
                            "download"    =>  $row['download'],
                            "param"     => array("id"   =>  $row['id']));
            
            if ($row['sub'] == 1) {
                $sub_array = $this->GetSubMenu($row['id'], $group_id);
                if (count($sub_array)>0) {
                    $data['sub'] = $sub_array;
                }
            }
            array_push($this->response, $data);
        }
        
        return $this->response;
        
    }

    function GetSubMenu($page_id, $group_id){

        $sub_arr = array();
        parent::setQuery("  SELECT  `pages`.`id`,
                                    `menu_detail`.`name`,
                                    `pages`.`name` AS `page`,
                                    `menu_detail`.`sub`,
                                    IFNULL(`group_permission`.`view`,0) as `view`,
                                    IFNULL(`group_permission`.`add`,0) as `add`,
                                    IFNULL(`group_permission`.`save`,0) as `save`,
                                    IFNULL(`group_permission`.`delete`,0) as `delete`,
                                    IFNULL(`group_permission`.`audio`,0) as `audio`,
                                    IFNULL(`group_permission`.`download`,0) as `download`,
                                    IFNULL(`group_permission`.id,0) AS `view_page`
                            FROM   `menu_detail`
                            LEFT JOIN    pages ON pages.id = menu_detail.page_id
                            LEFT JOIN    group_permission ON pages.id = group_permission.page_id AND group_permission.group_id = '$group_id'
                            LEFT JOIN   `group` ON `group`.id = group_permission.group_id
                            WHERE   menu_detail.actived = 1 AND menu_detail.parent = '$page_id'  AND pages.id IS NOT NULL 
                            ORDER BY menu_detail.order ASC");
        
        $result = parent::getResultArray();
        
        if (parent::getNumRow()) {
            foreach ($result['result'] AS $row){
                $sub_array = array();
                $data = array(  "page_id"   => $row['id'],
                                "view_page" => $row['view_page'],
                                "name"      => $row['name'], 
                                "page"      => $row['page'], 
                                "sub"       => "",
                                "view"      => $row['view'],
                                "add"       => $row['add'],
                                "save"      => $row['save'],
                                "delete"    => $row['delete'],
                                "audio"     => $row['audio'],
                                "download"  => $row['download']
                            );

                if($row['sub'] == 1){
                    $sub_array = $this->GetSubMenu(1, $row['id'], $group_id);
                    if (count($sub_array)>0) {
                        $data['sub'] = $sub_array;
                    }
                }

                array_push($sub_arr, $data);

            }
        }
        return $sub_arr;
    }


    public function getGroups() {

        parent::setQuery("SELECT id, `name` FROM `group` WHERE actived = 1");
        $result = parent::getResultArray()['result'];

        return $result;

    }


    public function updatePermission(){

        $user_id = $_SESSION['USERID'];
        $group_id = $_REQUEST['group_id'];
        $data = $_REQUEST['data'];

        $q = '';
        $p = '';

        foreach($data as $page_id => $value){
            if($value != ''){
                
                
                if($value['view_page'] == "true"){
                    $q .= "($group_id, $page_id, $value[view], $value[add], $value[save], $value[delete], $value[audio], $value[download]),";
                }else{
                  
                    $p .= "$page_id,";
                }
            }
        }

        if($p != ''){
            $p = rtrim($p, ',');

            parent::setQuery("DELETE FROM `group_permission` WHERE group_id = $group_id AND page_id IN ($p)");
            parent::execQuery();

        }
        
        
        if($q != ''){

            $q = rtrim($q, ',');

            parent::setQuery("DELETE FROM `group_permission` WHERE group_id = $group_id");
            parent::execQuery();
    
            parent::setQuery("INSERT INTO `group_permission` 
                                        (`group_id`, `page_id`, `view`, `add`, `save`, `delete`, `audio`, `download`) 
                                    VALUES $q");
            parent::execQuery();
    
        }
        
        return array("status" => 200, "message" => "პარამეტრები წარმატებით შეიცვალა");

    }

}