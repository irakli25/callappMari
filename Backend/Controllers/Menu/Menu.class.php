<?php 

use Middleware\Routers\dbClass;

class Menu extends dbClass{
    
    private $response = Array();
    
    function getMenuData(){
        
        $user_id = $_SESSION['USERID'];
        $lang_id = @$_SESSION['LANGID'];
        
        parent::setQuery(" SELECT   pages.id,
                                    IF(ISNULL(lang.value), menu_detail.name, value) as `name`,
                                    pages.`name` AS `page`,
                                    menu_detail.icon,
                                    menu_detail.sub
                            FROM   `users`
                            JOIN   `group` ON users.group_id = `group`.id
                            JOIN    group_permission ON group.id = group_permission.group_id
                            JOIN    pages ON pages.id = group_permission.page_id

                            JOIN    menu_detail ON menu_detail.page_id = pages.id
                            LEFT JOIN lang_table_translation AS lang ON lang.row_id = menu_detail.id AND lang.lang_id = '$lang_id'
                            WHERE   menu_detail.actived = 1 AND menu_detail.parent = 0 AND users.actived = 1 AND users.id = '$user_id' AND menu_detail.menu_id = 1
                            ORDER BY menu_detail.order ASC");
        
        $result = parent::getResultArray();
        
        foreach ($result['result'] AS $row){
            $sub_array = array();
            $data = array("page_id" => $row['id'], "name" => $row['name'], "page" => $row['page'], "icon" => $row['icon'], "sub"=>"", "param" => array("id"=>$row['id']));
            
            if ($row['sub'] == 1) {
                $sub_array = $this->GetSubMenu(1, $row['id']);
                if (count($sub_array)>0) {
                    $data['sub'] = $sub_array;
                }
            }
            array_push($this->response, $data);
        }
        
        return $this->response;
        
    }
    
    function GetSubMenu($user_id, $page_id){

        $user_id = $_SESSION['USERID'];
        $lang_id = @$_SESSION['LANGID'];
        
        $sub_arr = array();
        parent::setQuery("  SELECT  pages.id,
                                    IF(ISNULL(lang.value), menu_detail.name, value) as `name`,
                                    pages.`name` AS `page`,
                                    menu_detail.`sub`
                            FROM   `users`
                            JOIN   `group` ON users.group_id = `group`.id
                            JOIN    group_permission ON group.id = group_permission.group_id
                            JOIN    pages ON pages.id = group_permission.page_id
                            
                            JOIN    menu_detail ON menu_detail.page_id = pages.id
                            LEFT JOIN lang_table_translation AS lang ON lang.row_id = menu_detail.id AND lang.lang_id = '$lang_id'
                            WHERE   menu_detail.actived = 1 AND users.id = '$user_id' AND menu_detail.parent = '$page_id'
                            ORDER BY menu_detail.order ASC");
        
        $result = parent::getResultArray();
        
        if (parent::getNumRow()) {
            foreach ($result['result'] AS $row){
                $sub_array = array();
                $data = array("page_id" => $row['id'],"name" => $row['name'], "page" => $row['page'], "sub" => "");
                if($row['sub'] == 1){
                    $sub_array = $this->GetSubMenu(1, $row['id']);
                    if (count($sub_array)>0) {
                        $data['sub'] = $sub_array;
                    }
                }
                array_push($sub_arr, $data);
            }
        }
        return $sub_arr;
    }
    
}
?>