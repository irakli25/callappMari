<?php

use Middleware\Routers\dbClass;
class operator_call_chat_out extends dbClass{

    public function getList()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        $start_date      = rawurldecode($_REQUEST['start_date']);
        $end_date        = rawurldecode($_REQUEST['end_date']);
        
        

        // $filter = "";
        // $filter = " AND FROM_UNIXTIME( asterisk_call_log.call_datetime ) BETWEEN '$start_date' AND '$end_date' ";

        
        
        parent::setQuery("SELECT    IFNULL(incomming_request.user_id,asterisk_call_log.user_id) AS `id`,
                                    IFNULL(user_info.`name`,pers.`name`),
                                    COUNT(*) AS `all`,
                                    SUM(IF(NOT ISNULL(incomming_request.asterisk_call_log_id),1,0)) AS `phone`,
                                    SUM(IF(incomming_request.source_id = 9,1,0)) AS `vizit`,
                                    SUM(IF(NOT ISNULL(incomming_request.chat_id) AND incomming_request.source_id = 2,1,0)) AS `live_chat`,
                                    SUM(IF(NOT ISNULL(incomming_request.chat_id) AND incomming_request.source_id = 3,1,0)) AS `fb_chat`,
                                    SUM(IF(NOT ISNULL(incomming_request.mail_id),1,0)) AS `mail_chat`
                            FROM      incomming_request
                            JOIN users ON users.id = incomming_request.user_id
                            LEFT JOIN user_info ON user_info.user_id = users.id
                            LEFT JOIN asterisk_call_log ON asterisk_call_log.id = incomming_request.asterisk_call_log_id
                            LEFT JOIN users AS us ON us.id = asterisk_call_log.user_id
                            LEFT JOIN user_info AS pers ON us.id = pers.user_id
                            WHERE     incomming_request.datetime BETWEEN '$start_date' AND '$end_date'
                            AND 	  NOT ISNULL(IFNULL(incomming_request.user_id,asterisk_call_log.user_id))
                            GROUP BY  IFNULL(incomming_request.user_id,asterisk_call_log.user_id)");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }
}