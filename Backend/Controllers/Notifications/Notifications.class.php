<?php

use Middleware\Routers\dbClass;

class Notifications extends dbClass
{
    public function GET()
    {
        $result = array();
        $user_id = $_REQUEST['user_id']; // $_SESSION['USERID'];
        $filter = " AND notification.user_id = '$user_id' ";

        parent::setQuery("   SELECT	    id,
                                        page_id,
                                        CONCAT('დავალება #',`row_id`) as title,
                                        TIME(datetime) as `time`,
                                        CONCAT(DATE(datetime),' ',`message`) as info,
                                        'tasks' as icon,
                                        '#048145' as color
                            FROM 		notification
                            WHERE notification.actived = 1 AND (notification.view = 0 OR ISNULL(notification.view)) $filter
                            ORDER BY    id DESC ");

        $result_notify = parent::getResultArray()['result'];

        parent::setQuery("  SELECT  statement.id,
                                    CONCAT('განცხადება #',`id`) as title,
                                    TIME(datetime) as `time`,
                                    '' as info,
                                    '#048145' as color
                            FROM   statement
                            WHERE  `statement`.`actived` = 1 AND `statement`.`status_id` = 1 AND `view` = 0
                        ");

        $result_statement = parent::getResultArray()['result'];

        $result = array("notify" => null, 'statement' => null);

        parent::setQuery("SELECT group_id FROM users WHERE id = '$user_id'");
        $group = (int)parent::getResultArray()['result'][0]['group_id'];
        
        $arr = array(30, 1);

        if(!empty($result_statement)){
            if(in_array($group, $arr)){
                
                $users = array(270, 1, 161, 159);
                if(!in_array($user_id, $users)){
                    $st = $result_statement;
                }else{
                    $st = array();
                }
                
            }else{
                $st = array();
            }
        }

        $result['notify'] = !empty($result_notify) ? $result_notify : array();
        $result['statement'] = $st;

        // if (empty($result)) {
        //     $result[] = array("id" => 0);
        // }

        return $result;
    }

    public function INSERT()
    {
        $row_id = $_REQUEST['row_id'];
        $page_id = $_SESSION['PAGEID'];
        $user_id = $_SESSION['USERID'];
        $message = "ახალი";
        $message2 = "განახლდა";
        $user_ids = $_REQUEST['user_ids'];
        $dep_ids = $_REQUEST['dep_ids'];
        $notif = $_REQUEST['notif'];
        $values = '';
        if (empty($notif)) {
            $notif = 1;
        }

        if ($notif == 3) {
            $message = "დაემატა კომენტარი";
            $message2 = "დაემატა კომენტარი";
        }

        if ($notif == 4) {
            $message = "დაემატა ფაილი";
            $message2 = "დაემატა ფაილი";
        }

        if (!empty($user_ids) && $user_ids != 'undefined') {
            if (!empty($dep_ids) && $dep_ids != 'undefined') {
                $filter = " department_id IN($dep_ids) AND group_head = 1 ";

                parent::setQuery("  SELECT `user_id`
                                    FROM   user_info
                                    WHERE $filter");

                $result = parent::getResultArray()['result'];

                foreach ($result as $res) {
                    if ($user_id != $res['user_id']) {
                        $values .= "('$row_id','$res[user_id]',NOW(),'$message','$page_id','$notif'),";
                    }
                }
            }

            $user_ids = explode(",", $user_ids);

            foreach ($user_ids as $userId) {
                $values .= "('$row_id','$userId',NOW(),'$message','$page_id','$notif'),";
            }
        } else {
            if (!empty($dep_ids) && $dep_ids != 'undefined') {
                $filter = " department_id IN($dep_ids)";
                //array_push($dep_ids, $user_id);

                parent::setQuery("  SELECT `user_id`
                                    FROM   user_info
                                    WHERE $filter");

                $result = parent::getResultArray()['result'];

                foreach ($result as $res) {
                    if ($user_id != $res['user_id']) {
                        $values .= "('$row_id','$res[user_id]',NOW(),'$message','$page_id','$notif'),";
                    }
                }
            }
        }

        $values .= "('$row_id','$user_id',NOW(),'$message','$page_id','$notif'),";


        $values = substr_replace($values, "", -1);

        parent::setQuery("INSERT INTO notification(`row_id`,`user_id`,`datetime`,`message`,`page_id`,`notif`)
                                            VALUES " . $values . " ON DUPLICATE KEY UPDATE message='$message2', view=0");
        parent::execQuery();

        return array("status" => "OK");
    }

    public function REMOVE()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE notification
                             SET view = '1'
                             WHERE id = '$id'");
        parent::execQuery();

        return array("status" => "OK");
    }
}
