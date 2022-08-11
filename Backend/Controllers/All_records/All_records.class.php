<?php

use Middleware\Routers\dbClass;
class All_records extends dbClass{

    public function getList()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        $start_date      = rawurldecode($_REQUEST['start_date']);
        $end_date        = rawurldecode($_REQUEST['end_date']);
        $call_type       = rawurldecode($_REQUEST['call_type']);
        

        $filter = "";
        $filter = " AND FROM_UNIXTIME( asterisk_call_log.call_datetime ) BETWEEN '$start_date' AND '$end_date' ";

        if (!empty($call_type)) {
            $filter .= " AND (asterisk_call_log.call_type_id IN($call_type)) ";
        }
        
        parent::setQuery("  SELECT asterisk_call_log.id,
                                FROM_UNIXTIME(asterisk_call_log.call_datetime) AS 'თარიღი',
                                CASE
                                    WHEN asterisk_call_log.call_type_id = 1 THEN asterisk_call_log.source
                                    WHEN asterisk_call_log.call_type_id = 2 THEN asterisk_extension.`name`
                                    WHEN asterisk_call_log.call_type_id = 3 THEN asterisk_call_log.source
                                END AS 'წყარო',
                                CASE
                                    WHEN asterisk_call_log.call_type_id = 1 THEN asterisk_extension.`name`
                                    WHEN asterisk_call_log.call_type_id = 2 THEN asterisk_call_log.destination
                                    WHEN asterisk_call_log.call_type_id = 3 THEN asterisk_call_log.destination
                                END AS 'ნომერი',
                                user_info.name AS 'ოპერატორი',
                                CASE
                                    WHEN asterisk_call_type.id = 1 THEN 'შემომავალი'
                                    WHEN asterisk_call_type.id = 2 THEN 'გამავალი'
                                    WHEN asterisk_call_type.id = 3 THEN 'ლოკალური'
                                    WHEN asterisk_call_type.id = 4 THEN 'ვიდეო ზარი'
                                    WHEN asterisk_call_type.id = 5 THEN 'ავტო-დაილერი'
                                END AS 'ზარის ტიპი',
                                CASE 
                                    WHEN asterisk_call_log.call_status_id IN(9, 12) THEN 'Lost'
                                    WHEN asterisk_call_log.call_status_id IN(6,7,8,13) THEN 'Answered'
                                    WHEN asterisk_call_log.call_status_id = 15 THEN 'Awaiting'
                                    WHEN asterisk_call_log.call_status_id = 17 THEN 'Abandoned'
                                    WHEN asterisk_call_log.call_status_id = 18 THEN 'Rejected'
                                END AS 'სტატუსი',
                                TIME_FORMAT(SEC_TO_TIME(asterisk_call_log.talk_time),'%i:%s') AS 'საუბრის ხ-ობა',
                                CONCAT(DATE_FORMAT( FROM_UNIXTIME( asterisk_call_log.call_datetime ), '%Y/%m/%d/' ), asterisk_call_record.NAME, '.', asterisk_call_record.format ) AS 'ჩანაწერი'
                            FROM asterisk_call_log
                            LEFT JOIN user_info ON asterisk_call_log.user_id = user_info.user_id
                            JOIN asterisk_call_type ON asterisk_call_log.call_type_id = asterisk_call_type.id
                            LEFT JOIN asterisk_call_record ON asterisk_call_log.id = asterisk_call_record.asterisk_call_log_id
                            LEFT JOIN asterisk_extension ON asterisk_call_log.extension_id = asterisk_extension.id
                            WHERE asterisk_call_log.call_status_id NOT IN (0, 1, 2, 3, 4, 5) AND asterisk_call_type.id NOT IN (4, 5) $filter
                            ORDER BY asterisk_call_log.id DESC");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getCallType()
    {
        parent::setQuery("  SELECT id,
                                CASE
                                    WHEN asterisk_call_type.id = 1 THEN 'შემომავალი'
                                    WHEN asterisk_call_type.id = 2 THEN 'გამავალი'
                                    WHEN asterisk_call_type.id = 3 THEN 'ლოკალური'
                                    WHEN asterisk_call_type.id = 4 THEN 'ვიდეო ზარი'
                                    WHEN asterisk_call_type.id = 5 THEN 'ავტო-დაილერი'
                                END AS 'name'
                            FROM `asterisk_call_type` 
                            WHERE id NOT IN (4, 5)");

        $result = parent::getResultArray()['result'];
        return $result;
    }



        // $allstatus_multi = rawurldecode($_REQUEST['all_status']);                    //სტატუსის ფილტრი
        // $allstatus_multi_filter = '';                                               
        // if (!empty($allstatus_multi)) {
        //     if ($allstatus_multi == 9) {
        //         $allstatus_multi_filter .= "9,12";
        //     }
        //     if ($allstatus_multi == 3) {
        //         $allstatus_multi_filter .= "6,7,8,13";
        //     }
        //     $filter .= " AND (asterisk_call_log.call_status_id IN($allstatus_multi_filter)) ";
        // }
        
    // public function getAllStatus()                                                               //სტატუსის ფილტრი
    // {
    //     parent::setQuery("  SELECT  status_id as id,
    //                                 `name`
    //                         FROM  allstatus
    //                         WHERE actived = 1 ");

    //     $result = parent::getResultArray()['result'];
    //     return $result;
    // }
}