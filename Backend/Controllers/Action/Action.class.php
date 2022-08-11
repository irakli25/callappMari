<?php

use Controllers\IncommingTabs\news;
use Middleware\Routers\dbClass;

class Action extends dbClass
{

    public function getList()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        $status_id  = urldecode($_REQUEST['status_id']);
        $startDate  = rawurldecode($_REQUEST['start_date']);
        $endDate    = rawurldecode($_REQUEST['end_date']);

        $filter = "";
        $filter_ab = "";

        if (empty($status_id) || $status_id == 1 || $status_id == 3) {
            $filter = " AND news.archived = 0 AND tab_id = '$status_id'";
        } else {
            $filter = " AND news.archived = 1 AND news.end_date BETWEEN '$startDate' AND '$endDate'";
        }

        if($status_id == 1){
            $filter_ab = "AND news.abonentrb >= 6";
        }

        parent::setQuery("   SELECT	    news.id,
                                        LEFT(news.start_date, LENGTH(news.start_date) - 3)  AS `start_date`,
                                        LEFT(news.end_date,   LENGTH(news.end_date)   - 3)  AS `end_date`,
                                        news.description,
                                        action_region.name,
                                        disconnect_category.name,
                                        action_worker.name,
                                        disconnect_reason.name,
                                        restore_status.name,
                                        news.abonentrb,
                                        user_info.name,
                                        (SELECT concat('Frontend/Uploads/','asterisk-records/',hash,'.',type) 
                                        FROM upload_files 
                                        WHERE route = 'voice' AND row_id = news.id AND actived = 1 ORDER BY positionVC DESC LIMIT 1) as url,
                                        '' as download

                                FROM 		news
                                LEFT JOIN   users ON users.id = news.user_id
                                LEFT JOIN   `user_info` ON `user_info`.user_id = `users`.id
                                LEFT JOIN   action_region ON action_region.id = news.raion_id
                                LEFT JOIN   disconnect_category ON disconnect_category.id = news.disconnect_category_id
                                LEFT JOIN   action_worker ON action_worker.id = news.worker_id
                                LEFT JOIN   disconnect_reason ON disconnect_reason.id = news.disconnect_reason_id
                                LEFT JOIN   restore_status ON restore_status.id = news.restore_id
                                WHERE news.actived = 1 $filter_ab $filter
                                ORDER BY    news.id DESC ");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function ADD()
    {
        $name = $_REQUEST['name'];
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];
        $description = parent::escp($_REQUEST['description']);
        $user_id = $_SESSION['USERID'];
        $id = $_REQUEST['id'];
        $abonentrb = $_REQUEST['abonentrb'];
        $raion_id = $_REQUEST['raion_id'];
        $disconnect_id = $_REQUEST['disconnect_id'];
        $worker_id = $_REQUEST['worker_id'];
        $reason_id = $_REQUEST['reason_id'];
        $restore_id = $_REQUEST['restore_id'];
        $newstype_id = $_REQUEST['newstype_id'];
        $tab_id = $_REQUEST['tab_id'];

        parent::setQuery("INSERT INTO news(`id`,`datetime`,`user_id`,`start_date`,`end_date`,`name`,`description`,`news_type_id`,`raion_id`,`abonentrb`,`worker_id`,`disconnect_category_id`,`disconnect_reason_id`,`restore_id`,`tab_id`)
                                VALUES ('$id',NOW(),'$user_id','$start_date','$end_date','$name','$description','$newstype_id','$raion_id','$abonentrb','$worker_id','$disconnect_id','$reason_id','$restore_id','$tab_id')");
        parent::execQuery();

        return array("status" => "OK", "news_id" => parent::getLastId());
    }

    public function getFiles()
    {
        $colCount = $_REQUEST['count'];
        $cols     = $_REQUEST['cols'];
        $route = $_REQUEST['uploaded_from'];
        $row_id = $_REQUEST['row_id'];

        if ($route == "voice") {
            parent::setQuery("  SELECT	`id`,
                                `original_name`,
                                positionVC as rig,
                                concat('Frontend/Uploads/','asterisk-records/',hash,'.',type),
                                '' as download
                        FROM    upload_files
                        WHERE 	actived = 1 AND row_id = '$row_id' AND route = '$route'
                        ORDER BY id DESC
                        LIMIT 200");
        } else {
            parent::setQuery("  SELECT	`id`,
                                `datetime`,
                                `original_name`,
                                concat('Frontend/Uploads/',DATE(datetime),'/',hash,'.',type),
                                '' as download
                        FROM    upload_files
                        WHERE 	actived = 1 AND row_id = '$row_id' AND route = '$route'
                        ORDER BY id DESC
                        LIMIT 200");
        }


        $callList = parent::getKendoList($colCount, $cols);

        return $callList;
    }

    public function updateVoices()
    {

        $value = $_REQUEST["position"];
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE upload_files
                             SET positionVC = '$value'
                             WHERE id = '$id'");
        parent::execQuery();

        return array("status" => "OK");
    }

    public function removeFile()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE upload_files
                             SET actived = '0'
                             WHERE id = '$id'");
        parent::execQuery();

        return array("status" => "OK");
    }

    public function GETID()
    {
        parent::setQuery("INSERT INTO news(`user_id`)
                                       VALUES ('0')");
        parent::execQuery();

        $id = parent::getLastId();

        parent::setQuery("DELETE FROM news 
        WHERE id = '$id'");
        parent::execQuery();

        return array("id" => $id);
    }

    public function DELETE()
    {
        $id = $_REQUEST['id'];
        $disable_user_id = $_SESSION['USERID'];

        parent::setQuery("UPDATE news 
                          SET  actived = '0' ,  disable_user_id = '$disable_user_id'
                          WHERE id = '$id' ");

        parent::execQuery();

        return array("status" => "OK");
    }

    public function ARCHIVE()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE news 
                          SET  archived = 1
                          WHERE id = '$id' ");

        parent::execQuery();

        return array("status" => "OK");
    }

    function EDIT()
    {
        $id = $_REQUEST['id'];


        parent::setQuery("  SELECT *
                            FROM   news
                            WHERE  id = '$id'");
        $result = parent::getResultArray()['result'][0];

        return $result;
    }

    public function UPDATE()
    {

        $name = $_REQUEST['name'];
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];
        $description = parent::escp($_REQUEST['description']);
        $user_id = $_SESSION['USERID'];
        $id = $_REQUEST['id'];
        $abonentrb = $_REQUEST['abonentrb'];
        $raion_id = $_REQUEST['raion_id'];
        $disconnect_id = $_REQUEST['disconnect_id'];
        $worker_id = $_REQUEST['worker_id'];
        $reason_id = $_REQUEST['reason_id'];
        $restore_id = $_REQUEST['restore_id'];
        $newstype_id = $_REQUEST['newstype_id'];

        parent::setQuery("UPDATE news 
                          SET   `start_date`   = '$start_date',
                                `end_date`     = '$end_date',
                                `user_id`      = '$user_id',
                                `description`  = '$description',
                                `name`         = '$name',
                                `news_type_id` = '$newstype_id',
                                `raion_id`     = '$raion_id',
                                `abonentrb`    = '$abonentrb',
                                `worker_id`    = '$worker_id',
                                `restore_id`   = '$restore_id',
                                `disconnect_category_id` = '$disconnect_id',
                                `disconnect_reason_id`   = '$reason_id'
                         WHERE id = '$id' ");

        parent::execQuery();

        return array("status" => "OK");
    }

    public function getRegions()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM      `action_region` 
                        WHERE `action_region`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getDisconnectCategory()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM      `disconnect_category` 
                        WHERE `disconnect_category`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getWorker()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM      `action_worker` 
                        WHERE `action_worker`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getDisconnectReason()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM      `disconnect_reason` 
                        WHERE `disconnect_reason`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getNewsType()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM      `news_type` 
                        WHERE `news_type`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getRestore_Status()
    {

        parent::setQuery("SELECT    id,
                                    name
                        FROM      `restore_status` 
                        WHERE `restore_status`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getTabs()
    {
        parent::setQuery("SELECT    id,
                                    name
                        FROM      `news_tabs` 
                        WHERE `news_tabs`.actived = 1");

        $result = parent::getResultArray()['result'];

        return $result;
    }

    public function getHistory(){
        $colCount = $_REQUEST['count'];
        $cols     = $_REQUEST['cols'];
        $id = $_REQUEST['id'];
        parent ::setQuery(" SELECT 	news_log.id, 
                            start_date AS `date`, 
                            user_info.`name` AS `user`, 
                            news_log.change AS `change`,
                            news_log.change_field AS `field`,
                            news_log.newval AS `newval`,
                            news_log.oldval AS `oldval`
                    FROM news_log 
                    LEFT JOIN users ON users.id = news_log.user_id 
                    LEFT JOIN user_info ON users.id = user_info.user_id 
                    WHERE action_id = $id AND (news_log.change = 'შექმნა' OR (news_log.change_field != '' AND NOT ISNULL(news_log.change_field)))
                    ORDER BY news_log.id DESC");

        $historyList = parent::getKendoList($colCount, $cols);

        return $historyList;
    }
}
