<?php


use Middleware\Routers\dbClass;

class Task extends dbClass
{

    public $colCount;
    public $cols;


    public function getList()
    {
        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $startdate      = rawurldecode($_REQUEST['start_date']);
        $enddate        = rawurldecode($_REQUEST['end_date']);
        $operator       = $_REQUEST['operator'];
        $status         = $_REQUEST['status'];

        $filter = "";
        $filter = " AND task.datetime BETWEEN '$startdate' AND '$enddate' ";
        $archivedelet = " disableuserinfo.name,
                        `task`.disable_datetime, ";

        if (!empty($operator)) {
            $filter .= " AND task.`user_id` = '$operator'";
        }
        if (!empty($status && $status != 11)) {
            $filter .= " AND `task`.`task_status_parent_id` = '$status'";
        }
        if($status == 11){
            $actived = "`task`.actived = 0";
        }else{
            $actived = "`task`.actived = 1";
        }

        parent::setQuery("  SELECT 	*
                            FROM 	    `users`
                            WHERE 	`users`.`id` = '$_SESSION[USERID]'");
        $user_data = parent::getResultArray()['result'][0];
        $user = $user_data['id'];
        $group = $user_data['group_id'];
        $dep_id = $user_data['user_department_id'];

        if ($dep_id == null || $dep_id == '') {
            $dep_id = '66778899';                           //66778899 rom ar daemtxves arcert departaments , tu carielia
        }
        if ($user == 1 || $user == 161 || $user == 2 || $user == 42 || $user == 46 || $user == 126 || $user == 233 || $user == 121 || $user == 4 || $user == 149 || $group == 2 || $group == 3 || $group == 28 || $group == 29 || $user == 285 || $user == 128 || $user == 159 || $user == 232) {
            $user_dep = "";
        } else {
            $user_dep = "AND (task_responsible_user.user_departmanet_id IN($dep_id) OR `task`.`user_id` = '$user' OR task_responsible_user.task_responsive_user_id = '$user')";
        }

        parent::setQuery("  SELECT  `task`.id,                                    
                                    ussd.phoneNumber AS phoneNumber,
                                    ussd.CustomerNumber AS CustomerNumber,
                                    ussd.CustomerFullName AS CustomerFullName,
                                    ussd.CustomerAddress AS CustomerAddress,
                                    `task`.task_source_row_id as inc_id,
                                    `task`.datetime,
                                    `user_info`.name,
                                    task.phone AS telefoni,
                                    processing.`value`->>'$.inputs.abonentis_nomeri___019',
                                    `task`.abonent,
                                    GROUP_CONCAT(IFNULL(`resp_name`.name,resp_username.username)),
                                    department.name AS departamenti,
                                    IFNULL(category.name,cat2.name) AS qvecat,
                                    processing.`value`->>'$.inputs.misamarti___180' AS address,
                                    $archivedelet
                                    `Parent_status`.name,
                                    IF(NOT ISNULL(ussd_id), 'კი' , 'არა') ussdstatusi
                            FROM    task 
                            LEFT JOIN incomming_request ON incomming_request.id = task.task_source_row_id
                            LEFT JOIN ussd on ussd.id = incomming_request.ussd_id
                            JOIN users ON `users`.id = `task`.`user_id`
                            JOIN user_info ON `user_info`.user_id = `users`.id
                            LEFT JOIN task_status AS Parent_status ON `Parent_status`.id = `task`.task_status_parent_id AND `Parent_status`.actived = 1
                            LEFT JOIN task_responsible_user ON task_responsible_user.task_id = task.id
							LEFT JOIN users AS resp_username ON task_responsible_user.task_responsive_user_id = resp_username.id
                            LEFT JOIN user_info AS resp_name ON resp_username.id = resp_name.user_id
                            LEFT JOIN users AS disableuser ON disableuser.id = `task`.disable_user_id
							LEFT JOIN user_info AS disableuserinfo ON disableuserinfo.user_id = disableuser.id
                            LEFT JOIN   processing ON processing.processing_page_id = 1 AND processing.row_id = task.task_source_row_id
                            LEFT JOIN 	department ON task_responsible_user.user_departmanet_id = department.id
                            LEFT JOIN 	category ON category.id = processing.`value`->>'$.multilevel.zaris_kategoriebi___594___3'
							LEFT JOIN 	info_category_114 AS cat2 ON cat2.id = processing.`value`->>'$.multilevel.zaris_kategoriebi_114___726___3'
                            WHERE   $actived $filter $user_dep
                            GROUP BY `task`.id
                            ORDER BY `task`.id DESC");
        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function ADD()
    {
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];
        $comment = $_REQUEST['comment'];
        $task_source_id = $_REQUEST['task_source_id'];
        $user_id = $_SESSION['USERID'];
        $inc_id = $_REQUEST['inc_id'];
        $phone = $_REQUEST['phone'];
        $request_number = $_REQUEST['request_number'];
        $task_status_child_id = $_REQUEST['task_status_child_id'];
        $task_status_parent_id = $_REQUEST['task_status_parent_id'];
        $abonent = $_REQUEST['abonent'];
        $dep_ids = $_REQUEST['dep_ids'];
        $group_ids = $_REQUEST['group_ids'];
        $user_ids = $_REQUEST['user_ids'];
        $zeinkal_ids = $_REQUEST['zeinkal_ids'];
        $arr = [];

        if (!empty($dep_ids)) {
            $dep_ids = explode(",", $dep_ids);
            $arr['deps'] = $dep_ids;
        }

        if (!empty($group_ids)) {
            $group_ids = explode(",", $group_ids);
            $arr['groups'] = $group_ids;
        }

        if (!empty($user_ids)) {
            $user_ids = explode(",", $user_ids);
            $arr['users'] = $user_ids;
        }

        parent::setQuery("INSERT INTO task(`datetime`,`user_id`,`task_source_id`,`task_source_row_id`,`comment`,`start_date`,`end_date`,`phone`,`request_number`,`task_status_child_id`,`task_status_parent_id`,`abonent`)
                                    VALUES(NOW(),'$user_id','$task_source_id','$inc_id','$comment','$start_date','$end_date','$phone','$request_number','$task_status_child_id','$task_status_parent_id','$abonent')");

        parent::execQuery();

        $task_id = parent::getLastId();

        if (!empty($zeinkal_ids)) {
            $zeinkal_ids = explode(",", $zeinkal_ids);
            $values = "";

            foreach ($zeinkal_ids as $zeinkal_id) {
                $values .= "(NOW(),'$user_id','$task_id','$zeinkal_id'),";
            }

            $values = substr_replace($values, "", -1);

            parent::setQuery("INSERT INTO inserted_zeinkals(`datetime`,`user_id`,`task_id`,`task_zeinkal_id`)
                                        VALUES " . $values . "");
            parent::execQuery();
        }

        if (count($arr) > 0) {
            $i = 0;
            $values = "";

            if (count($arr['groups']) >= count($arr['deps']) && count($arr['groups']) >= count($arr['users'])) {
                foreach ($arr['groups'] as $group_id) {
                    $dep_id = $arr['deps'][$i];
                    $resp_user_id = $arr['users'][$i];

                    $values .= "(NOW(),'$user_id','$task_id','$dep_id','$group_id','$resp_user_id'),";
                    $i = $i + 1;
                }
            } else if (count($arr['deps']) >= count($arr['groups']) && count($arr['deps']) >= count($arr['users'])) {
                foreach ($arr['deps'] as $dep_id) {
                    $group_id = $arr['groups'][$i];
                    $resp_user_id = $arr['users'][$i];

                    $values .= "(NOW(),'$user_id','$task_id','$dep_id','$group_id','$resp_user_id'),";
                    $i = $i + 1;
                }
            } else if (count($arr['users']) >= count($arr['groups']) && count($arr['users']) >= count($arr['deps'])) {
                foreach ($arr['users'] as $resp_user_id) {
                    $dep_id = $arr['deps'][$i];
                    $group_id = $arr['groups'][$i];

                    $values .= "(NOW(),'$user_id','$task_id','$dep_id','$group_id','$resp_user_id'),";
                    $i = $i + 1;
                }
            }

            $values = substr_replace($values, "", -1);

            parent::setQuery("INSERT INTO task_responsible_user(`datetime`,`user_id`,`task_id`,`user_departmanet_id`,`user_group_id`,`task_responsive_user_id`)
                                                                VALUES " . $values . "");

            parent::execQuery();
        }

        return array("status" => "OK");
    }

    public function GET()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("SELECT `task`.*,
                                 `Parent_status`.name AS parent_name,
                                 `Parent_status`.id AS parent_id,
                                 `Child_status`.name AS child_name,
                                 `Child_status`.id AS child_id
                        FROM task 
                        LEFT JOIN task_status AS Parent_status ON `Parent_status`.id = `task`.task_status_parent_id AND `Parent_status`.actived = 1
                        LEFT JOIN task_status AS Child_status ON `Child_status`.id = `task`.task_status_child_id AND `Child_status`.actived = 1
                        WHERE `task`.id = '$id'");

        $result = parent::getResultArray()['result'][0];

        parent::setQuery("  SELECT  `task_responsible_user`.task_responsive_user_id as user_id,
                                    `task_responsible_user`.user_departmanet_id as dep_id,
                                    `task_responsible_user`.user_group_id  as group_id,
                                    `task_responsible_user`.id as task_rep_id
                            FROM task_responsible_user 
                            WHERE `task_responsible_user`.actived = 1 AND `task_responsible_user`.task_id = '$id'
                            GROUP BY id");

        $result['multiselect'] = parent::getResultArray()['result'];

        parent::setQuery("  SELECT  `inserted_zeinkals`.task_zeinkal_id as zeinkal_id
                            FROM inserted_zeinkals 
                            WHERE `inserted_zeinkals`.actived = 1 AND `inserted_zeinkals`.task_id = '$id'
                            GROUP BY id");

        $result['zeinkal_ids'] = parent::getResultArray()['result'];

        return $result;
    }

    public function GETSTATUS()
    {
        $name = $_REQUEST['name'];
        $id = @$_REQUEST['id'];
        $filter = "";

        if ($name == "status2") {
            $filter = " AND parent_id > 0 ";
        } else {
            $filter = " AND parent_id = 0 ";
        }

        if ($id > 0 and $name == "status2") {
            $filter = " AND parent_id = $id";
        }

        if ($name == "GETPARENTID") {
            $filter = " AND id = $id ";
            parent::setQuery("  SELECT  parent_id as id
                                FROM task_status 
                                WHERE `task_status`.actived = 1 $filter");
        } else {
            parent::setQuery("  SELECT  id,
                                        name
                                FROM task_status 
                                WHERE `task_status`.actived = 1 $filter");
        }





        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function DELETE()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE task 
                          SET  actived = '0',
                               disable_user_id = '" . $_SESSION['USERID'] . "',
                               disable_datetime = NOW()
                          WHERE id = '$id' ");

        parent::execQuery();

        return array("status" => "OK");
    }

    public function UPDATE()
    {
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];
        $user_id = $_SESSION['USERID'];
        $id = $_REQUEST['id'];
        $result = $_REQUEST['result'];
        $phone = $_REQUEST['phone'];
        $request_number = $_REQUEST['request_number'];
        $task_status_child_id = $_REQUEST['task_status_child_id'];
        $task_status_parent_id = $_REQUEST['task_status_parent_id'];
        $abonent = $_REQUEST['abonent'];
        $dep_ids = $_REQUEST['dep_ids'];
        $group_ids = $_REQUEST['group_ids'];
        $user_ids = $_REQUEST['user_ids'];
        $zeinkal_ids = $_REQUEST["zeinkal_ids"];
        $arr = [];
        $arr_delete = [];
        $valuesDepChange = "";

        $delete_dep_ids = $_REQUEST['delete_dep_ids'];
        $delete_group_ids = $_REQUEST['delete_group_ids'];
        $delete_user_ids = $_REQUEST['delete_user_ids'];
        $delete_zeinkal_ids = $_REQUEST['delete_zeinkal_ids'];

        if (!empty($delete_dep_ids)) {
            $delete_dep_ids = explode(",", $delete_dep_ids);
            $arr_delete['deps'] = $delete_dep_ids;

            foreach ($arr_delete['deps'] as $dep_id) {
                $valuesDepChange .= "(NOW(),'$user_id','$id','','$dep_id','2'),";
            }
        }

        if (!empty($delete_group_ids)) {
            $delete_group_ids = explode(",", $delete_group_ids);
            $arr_delete['groups'] = $delete_group_ids;
        }

        if (!empty($delete_user_ids)) {
            $delete_user_ids = explode(",", $delete_user_ids);
            $arr_delete['users'] = $delete_user_ids;
        }

        if (!empty($dep_ids)) {
            $dep_ids = explode(",", $dep_ids);
            $arr['deps'] = $dep_ids;

            foreach ($arr['deps'] as $dep_id) {
                $valuesDepChange .= "(NOW(),'$user_id','$id','','$dep_id','1'),";
            }
        }

        if (!empty($group_ids)) {
            $group_ids = explode(",", $group_ids);
            $arr['groups'] = $group_ids;
        }

        if (!empty($user_ids)) {
            $user_ids = explode(",", $user_ids);
            $arr['users'] = $user_ids;
        }

        if (!empty($zeinkal_ids)) {
            $zeinkal_ids = explode(",", $zeinkal_ids);
            $values = "";

            foreach ($zeinkal_ids as $zeinkal_id) {
                $values .= "(NOW(),'$user_id','$id','$zeinkal_id'),";
            }

            $values = substr_replace($values, "", -1);

            parent::setQuery("INSERT INTO inserted_zeinkals(`datetime`,`user_id`,`task_id`,`task_zeinkal_id`)
                                        VALUES " . $values . " ON DUPLICATE KEY UPDATE actived = 1");
            parent::execQuery();
        }

        if (!empty($delete_zeinkal_ids)) {
            $delete_zeinkal_ids = explode(",", $delete_zeinkal_ids);

            foreach ($delete_zeinkal_ids as $zeinkal_id) {

                parent::setQuery("  UPDATE inserted_zeinkals 
                                    SET   actived = 0
                                    WHERE task_id = '$id' AND task_zeinkal_id = '$zeinkal_id'");
                parent::execQuery();
            }
        }

        if (!empty($delete_dep_ids) || !empty($dep_ids)) {
            $valuesDepChange = substr_replace($valuesDepChange, "", -1);

            parent::setQuery("INSERT INTO task_department_log(`datetime`,`user_id`,`task_id`,`old_department_id`,`new_department_id`,`action`)
                                                                    VALUES " . $valuesDepChange . "
                                  ON DUPLICATE KEY UPDATE actived = 1");

            parent::execQuery();
        }



        if (count($arr_delete) > 0) {
            if (count($arr_delete['groups']) > 0) {
                foreach ($arr_delete['groups'] as $group_id) {
                    parent::setQuery("  UPDATE task_responsible_user 
                                        SET   user_group_id = 0
                                        WHERE task_id = '$id' AND user_group_id = '$group_id'");

                    parent::execQuery();
                }
            }
            if (count($arr_delete['deps']) > 0) {
                foreach ($arr['deps'] as $dep_id) {
                    parent::setQuery("  UPDATE task_responsible_user 
                                        SET   user_departmanet_id = 0
                                        WHERE task_id = '$id' AND user_departmanet_id = '$dep_id'");

                    parent::execQuery();
                }
            }
            if (count($arr_delete['users']) > 0) {
                foreach ($arr_delete['users'] as $resp_user_id) {
                    parent::setQuery("  UPDATE task_responsible_user 
                                        SET   task_responsive_user_id = 0
                                        WHERE task_id = '$id' AND task_responsive_user_id = '$resp_user_id'");

                    parent::execQuery();
                }
            }
        }

        if (count($arr) > 0) {
            $i = 0;
            $values = "";

            if (count($arr['groups']) >= count($arr['deps']) && count($arr['groups']) >= count($arr['users'])) {
                foreach ($arr['groups'] as $group_id) {
                    $dep_id = $arr['deps'][$i];
                    $resp_user_id = $arr['users'][$i];

                    $values .= "(NOW(),'$user_id','$id','$dep_id','$group_id','$resp_user_id'),";
                    $i = $i + 1;
                }
            } else if (count($arr['deps']) >= count($arr['groups']) && count($arr['deps']) >= count($arr['users'])) {
                foreach ($arr['deps'] as $dep_id) {
                    $group_id = $arr['groups'][$i];
                    $resp_user_id = $arr['users'][$i];

                    $values .= "(NOW(),'$user_id','$id','$dep_id','$group_id','$resp_user_id'),";
                    $i = $i + 1;
                }
            } else if (count($arr['users']) >= count($arr['groups']) && count($arr['users']) >= count($arr['deps'])) {
                foreach ($arr['users'] as $resp_user_id) {
                    $dep_id = $arr['deps'][$i];
                    $group_id = $arr['groups'][$i];

                    $values .= "(NOW(),'$user_id','$id','$dep_id','$group_id','$resp_user_id'),";
                    $i = $i + 1;
                }
            }

            if ($values != "") {
                $values = substr_replace($values, "", -1);

                parent::setQuery("INSERT INTO task_responsible_user(`datetime`,`user_id`,`task_id`,`user_departmanet_id`,`user_group_id`,`task_responsive_user_id`)
                                                                    VALUES " . $values . "
                                  ON DUPLICATE KEY UPDATE actived = 1");

                parent::execQuery();
            }
        }

        parent::setQuery("UPDATE task 
                          SET   `start_date`        = '$start_date',
                                `end_date`          = '$end_date',
                                `result`            = '$result',
                                `phone`             =  '$phone',
                                `request_number`    = '$request_number',
                                `task_status_child_id` = '$task_status_child_id',
                                `task_status_parent_id` = '$task_status_parent_id',
                                `abonent`           =  '$abonent'
                                WHERE id = '$id' ");

        parent::execQuery();

        return array("status" => "OK");
    }

    public function GETOPERATORS()
    {

        parent::setQuery("SELECT    `users`.`id`, 
                                    IFNULL(`user_info`.`name`,`users`.username) as name
                        FROM      `users` 
                        LEFT JOIN `user_info` ON `user_info`.user_id = `users`.id
                        WHERE `users`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function GETUSERGROUPS()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM  user_group
                        WHERE actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;;
    }

    public function GETUSERDEPARTMENTS()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM  department
                        WHERE actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getZeinkals()
    {
        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        $task_id         = $_REQUEST['id'];

        parent::setQuery("  SELECT  `task_locksmith`.id,
                                    `task_locksmith`.`datetime`,
                                    `service_center`.`name`,
                                    `task_zeinkals`.`name`,
                                    `task_zeinkals`.tin,
                                    CASE 
                                        WHEN `task_locksmith`.`actived` = 0 THEN 'გაუქმებული'
                                        WHEN `task_locksmith`.`actived` = 1 THEN IF(`task_locksmith`.`status` = 1,'დასრულებული','მიმდინარე')
                                    END as `status`    
                            FROM    task_locksmith 
                            JOIN    task_zeinkals ON `task_zeinkals`.id = `task_locksmith`.locksmith_id AND `task_zeinkals`.actived = 1
                            JOIN    service_center ON `service_center`.id = `task_locksmith`.service_center_id AND `service_center`.actived = 1
                            WHERE   `task_locksmith`.task_id = '$task_id '");
        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getZeinkalsSelect()
    {

        parent::setQuery("SELECT    id,
                                    name
                            FROM  task_zeinkals
                            WHERE actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getLogs()
    {
        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        $task_id         = $_REQUEST['id'];

        parent::setQuery("SELECT    task_department_log.id,
                                    task_department_log.datetime,
                                    user_info.name,
                                    GROUP_CONCAT(olddep.name),
                                    GROUP_CONCAT(newdep.name),
                                    IF(task_department_log.action = 1,'დამატება','წაშლა')
                            FROM  task_department_log
                            LEFT JOIN user_info ON user_info.user_id = task_department_log.user_id
                            LEFT JOIN department as olddep ON olddep.id = task_department_log.old_department_id
                            LEFT JOIN department as newdep ON newdep.id = task_department_log.new_department_id
                            WHERE task_department_log.actived = 1 AND task_department_log.task_id = '$task_id'
                            GROUP BY task_department_log.task_id , task_department_log.action");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }
}
