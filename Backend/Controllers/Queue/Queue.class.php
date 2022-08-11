<?php
session_start();

use Middleware\Routers\dbClass;

class Queue extends dbClass
{

    private $source;
    private $userId;

    public function getQueue(){

        $this->source = $_REQUEST['source'];
        $userId = $_REQUEST['userId'];

        switch($this->source){
            case 'phone':
                parent::setQuery(" SELECT	    IF(asterisk_call_log_live_calls.call_status_id <= 2, 'waiter', 'taken') AS type,
                                                incomming_request.request_name AS name,
                                                '' AS lastMessage,
                                                SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - asterisk_call_log_live_calls.call_datetime) AS lastDateTime,
                                                '' AS startDatetime,
                                                'Frontend/Assets/images/no-image.png' AS imgUrl,
                                                '' AS newMessage,
                                                source.key AS sourceKey,
                                                asterisk_call_log_live_calls.asterisk_call_log_id AS id,
                                                incomming_request.id AS incommingId

                                FROM 	    incomming_request
                                JOIN	    source ON source.id = incomming_request.source_id
                                JOIN	    asterisk_call_log_live_calls ON asterisk_call_log_live_calls.asterisk_call_log_id = incomming_request.asterisk_call_log_id
                                WHERE 	    incomming_request.source_id = 1
                                     AND    asterisk_call_log_live_calls.call_status_id IN (2,3) 
                                     AND    IF(asterisk_call_log_live_calls.call_status_id > 2, asterisk_call_log_live_calls.user_id = '$userId', 1=1)
                                     AND    (UNIX_TIMESTAMP(NOW()) - asterisk_call_log_live_calls.call_datetime) <= (60*30)
                                GROUP BY    asterisk_call_log_live_calls.id

                                ORDER BY  lastDateTime DESC");
                break;
            case 'mail':
                parent::setQuery("  SELECT 	IF(mail_live.mail_status_id = 1, 'waiter', 'taken') AS type,
                                            mail_live.sender_name AS name,
                                            mail_live.`subject` AS lastMessage,
                                            (SELECT DATE_FORMAT(datetime, '%H:%i') FROM mail_live_detail WHERE mail_live_detail.mail_id = mail_live.id ORDER BY id DESC LIMIT 1) AS lastDateTime,
                                            mail_live.send_datetime AS startDatetime,
                                            'Frontend/Assets/images/no-image.png' AS imgUrl,
                                            'false' AS newMessage,
                                            'mail' AS sourceKey,
                                            mail_live.id AS id,
                                            incomming_request.id AS incommingId
                                    FROM 	mail_live
                                    JOIN	incomming_request ON incomming_request.mail_id = mail_live.id
                                    WHERE 	mail_live.mail_status_id IN (1,2) AND mail_live.mail_type_id = 2 AND IF(mail_live.mail_status_id = 2, mail_live.user_id = '$userId', 1=1)");
                break;
            case 'ussd':
                parent::setQuery("  SELECT 	'waiter' AS type,
                                            ussd_live.abonent_name AS name,
                                            0 AS lastMessage,
                                            0 AS lastDateTime,
                                            ussd_live.datetime AS startDatetime,
                                            'Frontend/Assets/images/no-image.png' AS imgUrl,
                                            'false' AS newMessage,
                                            'ussd' AS sourceKey,
                                            ussd_live.id AS id,
                                            0 AS incommingId
                                    FROM 	ussd_live
                                   ");
                break;
            default:
                parent::setQuery("  SELECT		IF(chat.chat_status_id = 1, 'waiter', 'taken') AS type,
                                                chat.sender_name AS name,
                                                (SELECT message FROM chat_details WHERE chat_id = chat.id ORDER BY id DESC LIMIT 1) AS lastMessage,
                                                (SELECT DATE_FORMAT(datetime, '%H:%i') FROM chat_details WHERE chat_id = chat.id ORDER BY id DESC LIMIT 1) AS lastDateTime,
                                                chat.first_datetime AS startDatetime,
                                                'Frontend/Assets/images/no-image.png' AS imgUrl,
                                                IF((SELECT user_id FROM chat_details WHERE chat_id = chat.id ORDER BY id DESC LIMIT 1) = 0, 'false', 'true') AS newMessage,
                                                source.key AS sourceKey,
                                                chat.id AS id,
                                                incomming_request.id AS incommingId
                                            
                                        

                                    FROM 		chat
                                    JOIN		chat_details ON chat_details.chat_id = chat.id
                                    JOIN		source ON source.id = chat.source_id
                                    JOIN		incomming_request ON incomming_request.chat_id = chat.id
                                    WHERE 		chat.chat_status_id IN (1,2) AND source.key = '$this->source' AND IF(chat.chat_status_id = 2, chat.first_user_id = '$userId', 1=1)
                                    GROUP BY 	chat.id
                                    ORDER BY 	chat.last_datetime DESC");
        }

        $queueList = parent::getResultArray();

        return $queueList['result'];
    }
    
    public function flashPanelQueue(){
        $this->source = $_REQUEST['source'];

        switch($this->source){
            case 'phone':
                parent::setQuery("SET @rownum=0;");
                parent::execQuery();
                parent::setQuery("  SELECT      @`rownum` := @`rownum` + 1 AS `id`,
                                                IFNULL(channels_transfered.callerIDNum,IFNULL(channels2.exten,channels.exten)) AS exten,
                                                '' AS `lang`,
                                                channels.`callerIDNum` AS `number`, 
                                                '' AS `incomming_author`,
                                                '' AS `comment`,
                                                channels.`duration` AS `time`
                                                
        
        
                                    FROM  	    `asterisk`.`channels`  AS channels
                                    LEFT JOIN	asterisk.channels AS channels2 ON channels2.context = 'from-internal-xfer' AND channels2.callerIDNum = channels.callerIDNum AND channels2.`application` = 'Queue' 
                                    LEFT JOIN	asterisk.channels AS channels_transfered ON channels_transfered.context = 'from-trunk-sip-EE_Trunk_2484848' AND channels_transfered.connectedLineNum = channels.callerIDNum
                                    WHERE  	    (channels.`context` = 'ext-queues' OR channels.context = 'from-internal-xfer') AND channels.`application` = 'Queue' 
                                    AND         channels.callerIDNum NOT IN(SELECT callerIDNum FROM asterisk.channels AS `chan` WHERE (chan.context = 'macro-dial-one' OR chan.context = 'macro-dial') AND chan.channelStateDesc = 'Up')
                                    AND         channels.exten IN(SELECT number FROM `asterisk_queue` WHERE actived = 1)
                                    GROUP BY	channels.`callerIDNum`
                                    ORDER BY    exten, channels.`duration` DESC");
        
                $queueList = parent::getResultArray();
                break;
            case 'mail':
                parent::setQuery("SET @rownum=0;");
                parent::execQuery();
                parent::setQuery(" SELECT  @`rownum` := @`rownum` + 1 AS `id`,
                                            mail_live.id AS `chat_id`,
                                            mail_live.sender_name AS sender_name,
                                            mail_account.name,
                                            SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(mail_live.fetch_datetime)) AS duration
                                                
                                    FROM 	mail_live
                                    JOIN    mail_account ON mail_account.id = mail_live.account_id
                                    WHERE 	mail_live.mail_status_id = 1 AND mail_live.mail_type_id = 2");
        
                $queueList = parent::getResultArray();
                break;
            case 'ussd':
                parent::setQuery("SET @rownum=0;");
                parent::execQuery();
                parent::setQuery(" SELECT	@`rownum` := @`rownum` + 1 AS `id`,
                                            `incomming_request`.id as `incomming_id`,
                                            `ussd`.`id` as `ussd_id`,
                                            `ussd`.`CustomerFullName` as `sender_name`, 
                                            `ussd`.`phoneNumber` as `sender_phone`, 
                                            `ussd`.`CustomerNumber` as `customer_number`,  
                                            SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(`ussd`.`datetime`)) AS `duration`	
                                    FROM 		ussd 
                                    LEFT JOIN   incomming_request ON incomming_request.ussd_id = ussd.id
                                    WHERE taken_user_id IS NULL
                            ");
        
                $queueList = parent::getResultArray();
                break;
            case 'jorko':
                parent::setQuery("SET @rownum=0;");
                parent::execQuery();
                parent::setQuery(" SELECT	@`rownum` := @`rownum` + 1 AS `id`,
                                            `jorko_live`.`id` as `jorko_id`,
                                            `jorko_live`.`jorkos_nomeri` as `jorkos_nomeri`, 
                                            `jorko_live`.`saxeli` as `saxeli`, 
                                            `jorko_live`.`pexebis_raodenoba` as `pexebis_raodenoba`	
                                    FROM     jorko_live
                                    WHERE    jorko_live.jorko_status_id = 1 
                            ");
        
                $queueList = parent::getResultArray();
                break;
            default:
                parent::setQuery("SET @rownum=0;");
                parent::execQuery();
                parent::setQuery("  SELECT  @`rownum` := @`rownum` + 1 AS `id`,
                                            `chat`.id AS `chat_id`,
                                            chat.`sender_name`,
                                            `chat_account`.`name` as 'account',
                                            '' AS `comment`,
                                            SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(chat.first_datetime)) AS duration

                                    FROM 	chat
                                    JOIN	source ON source.id = chat.source_id
                                    LEFT JOIN    chat_account ON chat_account.id = chat.account_id AND chat_account.source_id = chat.source_id
                                    WHERE 	chat.chat_status_id = 1 AND source.`key` = '$this->source'");
        
                $queueList = parent::getResultArray();
        }
        

        return $queueList['result'];
    }

    public function flashPanel(){
        $this->source   = $_REQUEST['source'];
        $panelArray     = array();
        switch($this->source){
            case 'phone':
                parent::setQuery("  SELECT * 
                                    FROM (SELECT    asterisk_extension.id,
                                                    IFNULL(user_info.name, '') AS operator,
                                                    CONCAT(avatar.hash, '.', avatar.type) AS avatar,
                                                    queueMembers.name AS used_ext,
                                                    GROUP_CONCAT(DISTINCT queueMembers.queue) AS queues,
                                                    IF(asterisk.queueMembers.status IN (2,3,6,7,8), queue_lang.name, '') AS lang,
                                                    CONCAT(upload_files.hash, '.', upload_files.type) AS `icon`,
                                                    IF(asterisk.queueMembers.status IN (2,3,6,7,8), IFNULL(chan.exten, queueMembers.queue), '') AS `queue_now`,
                                                    GROUP_CONCAT(DISTINCT source.`key`) AS sources,
                                                    IFNULL(main_chan.connectedLineNum, IF(chan_out.channelStateDesc = 'Up',chan_out.connectedLineNum,'')) AS `phone`,
                                                    contact_person.name AS contact_person,
                                                    contact_person.private_number AS private_number,
                                                    contact_person.customer_number AS customer_number,
                                                    CASE
                                                                    WHEN `main_chan`.`context` = 'macro-dial-one' OR `main_chan`.`context` = 'macro-dial' OR `main_chan`.`context` = 'from-internal'  THEN 'in'
                                                                    WHEN `chan_out`.`context` = 'macro-dialout-trunk' THEN 'out'
                                                                    WHEN (SELECT context FROM asterisk.channels WHERE bridgeID = `main_chan`.`bridgeID` AND application='Dial' LIMIT 1) = 'autodialer' THEN 'in-autodialer'
                                                    END  AS `type`,
                                                    IFNULL(TIME_FORMAT(IFNULL(main_chan.duration, chan_out.duration), '%i:%s'), '00:00') AS `time`,
                                                    IF(queueMembers.paused = 1 OR (UNIX_TIMESTAMP(NOW()) - `queueMembers`.`lastCall`) < `queues`.`wrapUpTime`, 'paused', queueMemberStatus.`icon`) AS `status`
                                        FROM 		asterisk.queueMembers
                                        LEFT JOIN   asterisk.`queues` ON `queues`.`queue` = `queueMembers`.`queue`
                                        JOIN        asterisk.queueMemberStatus ON queueMembers.`status` = queueMemberStatus.id
                                        JOIN        callapp.asterisk_extension ON asterisk_extension.name = queueMembers.`name`
                                        LEFT JOIN   callapp.asterisk_queue AS callapp_queue ON callapp_queue.number = asterisk.`queues`.queue
                                        LEFT JOIN   callapp.upload_files ON upload_files.id = callapp_queue.icon AND upload_files.route = 'queueIcons'
                                        LEFT JOIN   callapp.queue_lang ON queue_lang.id = callapp_queue.lang

                                        LEFT JOIN   callapp.users ON users.extension_id = asterisk_extension.id AND users.logged = 1
                                        LEFT JOIN   callapp.user_info ON user_info.user_id = users.id
                                        LEFT JOIN   callapp.upload_files AS avatar ON avatar.id = user_info.image
                                                                                                        
                                        LEFT JOIN   asterisk.channels AS main_chan ON main_chan.callerIDName = queueMembers.`name` AND REPLACE(SUBSTRING_INDEX(queueMembers.location,'@',1),'Local','SIP') = SUBSTRING_INDEX(main_chan.channel,'-',1)
                                        LEFT JOIN   asterisk.channels AS chan ON chan.linkedid = main_chan.linkedid AND chan.context = 'from-queue'
                                        LEFT JOIN   asterisk.channels AS `chan_out` ON REPLACE(SUBSTRING_INDEX(queueMembers.location,'@',1),'Local','SIP') = SUBSTRING_INDEX(chan_out.channel,'-',1) AND chan_out.context = 'macro-dialout-trunk'

                                        LEFT JOIN	contact_person_detail ON contact_person_detail.value = main_chan.connectedLineNum
                                        LEFT JOIN 	contact_person ON contact_person.id = contact_person_detail.contact_person_id
                                        
                                        LEFT JOIN	source_control ON source_control.user_id = users.id AND source_control.actived = 1
                                        LEFT JOIN	source ON source.id = source_control.source_id

                                        WHERE 		queueMembers.queue IN(SELECT callapp.asterisk_queue.number FROM asterisk_queue WHERE actived = 1) AND !ISNULL(users.id)
                                        GROUP BY    queueMembers.`name`

                                        UNION ALL

                                        SELECT 		asterisk_extension.id,
                                                    '' AS operator,
                                                    '' AS avatar,
                                                    queueMembers.name AS used_ext,
                                                    GROUP_CONCAT(queueMembers.queue) AS queues,
                                                    IF(asterisk.queueMembers.status IN (2,3,6,7,8), queue_lang.name, '') AS lang,
                                                    CONCAT(upload_files.hash, '.', upload_files.type) AS `icon`,
                                                    IF(asterisk.queueMembers.status IN (2,3,6,7,8), IFNULL(chan.exten, queueMembers.queue), '') AS `queue_now`,
                                                    '' AS sources,
                                                    IFNULL(main_chan.connectedLineNum, IF(chan_out.channelStateDesc = 'Up',chan_out.connectedLineNum,'')) AS `phone`,
                                                    '' as contact_person,
                                                    '' AS private_number,
                                                                                                                                                    '' AS customer_number,
                                                    CASE
                                                                    WHEN `main_chan`.`context` = 'macro-dial-one' OR `main_chan`.`context` = 'macro-dial' OR `main_chan`.`context` = 'from-internal'  THEN 'in'
                                                                    WHEN `chan_out`.`context` = 'macro-dialout-trunk' THEN 'out'
                                                                    WHEN (SELECT context FROM asterisk.channels WHERE bridgeID = `main_chan`.`bridgeID` AND application='Dial' LIMIT 1) = 'autodialer' THEN 'in-autodialer'
                                                    END  AS `type`,
                                                    IFNULL(TIME_FORMAT(IFNULL(main_chan.duration, chan_out.duration), '%i:%s'), '00:00') AS `time`,
                                                    IF(queueMembers.paused = 1, 'paused', queueMemberStatus.`icon`) AS `status`


                                        FROM 		asterisk.queueMembers
                                        LEFT JOIN   asterisk.`queues` ON `queues`.`queue` = `queueMembers`.`queue`
                                        JOIN        asterisk.queueMemberStatus ON queueMembers.`status` = queueMemberStatus.id
                                        JOIN        callapp.asterisk_extension ON asterisk_extension.name = queueMembers.`name`
                                        LEFT JOIN   callapp.users ON users.extension_id = asterisk_extension.id AND users.logged = 1

                                        LEFT JOIN   callapp.asterisk_queue AS callapp_queue ON callapp_queue.number = asterisk.`queues`.queue
                                        LEFT JOIN   callapp.upload_files ON upload_files.id = callapp_queue.icon AND upload_files.route = 'queueIcons'
                                        LEFT JOIN   callapp.queue_lang ON queue_lang.id = callapp_queue.lang

                                        LEFT JOIN   asterisk.channels AS main_chan ON main_chan.callerIDName = queueMembers.`name` AND REPLACE(SUBSTRING_INDEX(queueMembers.location,'@',1),'Local','SIP') = SUBSTRING_INDEX(main_chan.channel,'-',1)
                                        LEFT JOIN   asterisk.channels AS chan ON chan.linkedid = main_chan.linkedid AND chan.context = 'from-queue'
                                        LEFT JOIN   asterisk.channels AS `chan_out` ON REPLACE(SUBSTRING_INDEX(queueMembers.location,'@',1),'Local','SIP') = SUBSTRING_INDEX(chan_out.channel,'-',1) AND chan_out.context = 'macro-dialout-trunk'
                                                                                                        
                                        WHERE 		queueMembers.queue IN(SELECT callapp.asterisk_queue.number FROM asterisk_queue WHERE actived = 1) AND ISNULL(users.id) AND queueMembers.status NOT IN(0,4,5)
                                        GROUP BY    queueMembers.`name`)  as livestate
                                    ORDER BY livestate.used_ext");

                $panelData = parent::getResultArray();
                
                foreach($panelData['result'] AS $data){

                    $queues = explode(',', $data['queues']);
                    $queuesArray = array();
                    foreach($queues AS $queue){
                        array_push($queuesArray, array("text" => $queue, "background" => "#000", "foreground" => "#FFF"));
                    }
                    array_push($panelArray, array(  "id" => $data['id'],
                                                    "operator" => array("text" => $data['operator'], "avatar" => $data['avatar'], "status" => array("key" => "active", "title" => "აქტიური", "background" => "red"), "extension" => array("text" => $data['used_ext'], "background" => "#B2E9A9", "foreground" => "")),
                                                    "accList" => $queuesArray,
                                                    "account" => array("text" => $data['queue_now'], "background" => "#FFF7CF", "foreground" => "", "lang" => $data['lang'], "icon" => $data['icon']),
                                                    "sources" => explode(',', $data['sources']),
                                                    "sourceKey" => "phone",
                                                    "status" => $data['status'],
                                                    "author" => array("text" => "", "avatar" => false, "number" => array("text" => $data['phone'], "name" => $data['contact_person'], "private_number" => $data['private_number'], "customer_number" => $data['customer_number'], "background" => "", "foreground" => "")),
                                                    "callType" => $data['type'],
                                                    "duration" => $data['time'],
                                                    "totalDuration" => $data['time']));
                }
                break;
            case 'mail':
                parent::setQuery("  SELECT 		mail_live.id AS id,
                                                user_info.name AS operator_name,
                                                false AS operator_avatar,
                                                mail_account.`name` AS mail_account_name,
                                                mail_account.color AS mail_account_color,
                                                false AS sender_avatar,
                                                mail_live.sender_name AS sender_name,
                                                mail_live.sender_address AS sender_address,
                                                SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(mail_live.fetch_datetime)) AS duration

                                    FROM 		mail_live
                                    LEFT JOIN   users ON users.id = mail_live.user_id
                                    LEFT JOIN   user_info ON user_info.user_id = users.id
                                    JOIN        mail_account ON mail_account.id = mail_live.account_id
                                    WHERE 		mail_live.mail_status_id = 2 AND mail_live.mail_type_id = 2");
                $panelData = parent::getResultArray();

                foreach($panelData['result'] AS $data){
                    array_push($panelArray, array(  "id" => $data['id'],
                                                    "operator" => array("text" => $data['operator_name'], "avatar" => false),
                                                    "account" => array("text" => $data['mail_account_name'], "foreground" => $data['mail_account_color']),
                                                    "sourceKey" => "mail",
                                                    "author" => array("text" => $data['sender_name'], "address" => $data['sender_address'], "avatar" => false),
                                                    "duration" => $data['duration'],
                                                    "totalDuration" => $data['duration']));
                }
                break;
            case 'ussd':
                parent::setQuery("  SELECT     `incomming_request`.`id` as `id`,
                                                `ussd`.`id` AS `ussd_id`,
                                                `user_info`.`name` AS `operator_name`,
                                                -- GROUP_CONCAT(DISTINCT source.`key`) AS sources,
                                                SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(ussd.taken_datetime)) AS `duration`,
                                                `ussd`.`CustomerFullName` as `sender_name`
                                    FROM        `ussd`
                                    LEFT JOIN   incomming_request ON incomming_request.ussd_id = ussd.id
                                    LEFT JOIN   `user_info` as `user_info` ON user_info.user_id = ussd.taken_user_id
                                    LEFT JOIN	source_control ON source_control.user_id = ussd.taken_user_id AND source_control.actived = 1
                                    LEFT JOIN	source ON source.id = source_control.source_id
                                    WHERE       ussd.user_id IS NULL AND ussd.taken_user_id IS NOT NULL
                                    GROUP BY    ussd.id");
                $panelData = parent::getResultArray();

                foreach($panelData['result'] AS $data){
                    array_push($panelArray, array(  "id" => $data['id'],
                                                    "operator" => array("text" => $data['operator_name'], "avatar" => false),
                                                    "sourceKey" => "ussd",
                                                    "author" => array("text" => $data['sender_name'], "avatar" => false),
                                                    // "sources" => explode(',', $data['sources']),
                                                    "ussd_id" => $data['ussd_id'],
                                                    "duration" => $data['duration']));
                }
                break;
            case 'jorko':
                parent::setQuery("  SELECT      `jorko`.`jorkos_nomeri` AS `nomeri`,
                                                `jorko`.`saxeli` AS `saxeli`,
                                                `user_info`.`name` AS `operator_name`,
                                                `jorko`.`pexebis_raodenoba` AS `pexebis_raodenoba`,
                                                SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(jorko.datetime)) AS `duration`
                                    FROM        `jorko`
                                    LEFT JOIN   user_info ON user_info.user_id = jorko.taken_user_id
                                    WHERE       jorko.actived = 1
                                    GROUP BY    jorko.id");
                $panelData = parent::getResultArray();

                foreach($panelData['result'] AS $data){
                    array_push($panelArray, array(  "operator" => array("text" => $data['operator_name'], "avatar" => false),
                                                    "nomeri" => $data['nomeri'],
                                                    "sourceKey" => "jorko",
                                                    "saxeli" => $data['saxeli'],
                                                    "pexebis_raodenoba" => $data['pexebis_raodenoba'],
                                                    "duration" => $data['duration']));
                }
                break;

            default:
                parent::setQuery("  SELECT			`incomming_request`.`id`,
                                                    `chat`.`id` as `chat_id`,
                                                    '' as `key`,
                                                    chat_account.name AS account,
                                                    user_info.name AS operator_name,
                                                    chat_account.`name` AS account_name,
                                                    chat_account.color AS account_color,
                                                    chat.sender_name AS sender_name,
                                                    '' AS 'comment',
                                                    IF((SELECT user_id FROM chat_details WHERE chat_id = chat.id ORDER BY id DESC LIMIT 1) = 0, 'false', 'true') AS newMessage,
                                                    SEC_TO_TIME(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(IFNULL(chat.last_datetime, chat.first_datetime))) AS duration

                                    FROM 		chat
                                    LEFT JOIN   incomming_request ON incomming_request.chat_id = chat.id
                                    LEFT JOIN   users ON users.id = chat.first_user_id
                                    LEFT JOIN   user_info ON user_info.user_id = users.id
                                    LEFT JOIN		chat_account ON chat_account.id = chat.account_id AND chat_account.source_id = chat.source_id

                                    LEFT JOIN	source ON source.id = chat.source_id

                                    WHERE 		chat.chat_status_id = 2 AND source.`key` = '$this->source'");
                $panelData = parent::getResultArray();

                foreach($panelData['result'] AS $data){
                    array_push($panelArray, array(  "id" => $data['id'],
                                                    "chat_id" => $data['chat_id'],
                                                    "operator" => array("text" => $data['operator_name'], "avatar" => false),
                                                    "account" => array("text" => $data['account_name'], "foreground" => $data['account_color']),
                                                    "sourceKey" => $data['key'],
                                                    "author" => array("text" => $data['sender_name'], "avatar" => false),
                                                    "newMessage" => (bool)$data['newMessage'],
                                                    "duration" => $data['duration'],
                                                    "totalDuration" => $data['duration']));
                }
        }
        

        return $panelArray;
        
    }

    public function getFlashPanelQueueCountArray(){
        parent::setQuery("  SELECT 'phone' AS source_key,
                                    COUNT(*) AS 'queue'
                            FROM(SELECT   COUNT(*)
                                FROM  	    `asterisk`.`channels`  AS channels
                                LEFT JOIN	asterisk.channels AS channels2 ON channels2.context = 'from-internal-xfer' AND channels2.callerIDNum = channels.callerIDNum AND channels2.`application` = 'Queue' 
                                LEFT JOIN	asterisk.channels AS channels_transfered ON channels_transfered.context = 'from-trunk-sip-EE_Trunk_2484848' AND channels_transfered.connectedLineNum = channels.callerIDNum
                                WHERE  	    (channels.`context` = 'ext-queues' OR channels.context = 'from-internal-xfer') AND channels.`application` = 'Queue' 
                                AND         channels.callerIDNum NOT IN(SELECT callerIDNum FROM asterisk.channels AS `chan` WHERE (chan.context = 'macro-dial-one' OR chan.context = 'macro-dial') AND chan.channelStateDesc = 'Up')
                                AND         channels.exten IN(SELECT number FROM `asterisk_queue` WHERE actived = 1)
                                GROUP BY	channels.`callerIDNum`) AS `queue`

                            UNION ALL

                            SELECT		source.`key` AS source_key,
                                        COUNT(chat.id) AS 'queue'
                            FROM 		source
                            LEFT JOIN	chat ON chat.source_id = source.id AND chat.chat_status_id = 1
                            WHERE 		source.actived = 1 AND source.id NOT IN (1,12)
                            GROUP BY 	source.id

                            UNION ALL

                            SELECT	    'mail' AS source_key,
                                        COUNT(*) AS 'queue'
                            FROM 	    mail_live
                            WHERE 	    mail_status_id = 1

                            UNION ALL

                            SELECT	    'ussd' AS source_key,
                                        COUNT(*) AS 'queue'
                            FROM 	    ussd
                            WHERE 	    taken_user_id IS NULL

                            UNION ALL

                            SELECT	    'jorko' AS source_key,
                                        COUNT(*) AS 'queue'
                            FROM 	    jorko
                            WHERE 	    jorko_status_id = 1
                            ");
        $sourceQueue = parent::getResultArray();
        
        $queueArray = array();

        foreach($sourceQueue['result'] AS $queue){
            array_push($queueArray, array("source" => $queue['source_key'], "value" => (int)$queue['queue']));
        }

        return $queueArray;
    }

    public function getFlashPanelQueueCountObject(){
        parent::setQuery("  SELECT 	'phone' AS source_key,
                                    COUNT(*) AS 'queue'

                            FROM 	asterisk_call_log
                            WHERE 	call_type_id = 1 AND call_status_id = 2

                            UNION ALL
                            
                            SELECT		source.`key` AS source_key,
                                        COUNT(chat.id) AS 'queue'
                            FROM 		source
                            LEFT JOIN	chat ON chat.source_id = source.id AND chat.chat_status_id = 1
                            WHERE 		source.actived = 1 AND source.id NOT IN (1, 4)
                            GROUP BY 	source.id
                            
                            UNION ALL

                            SELECT	    'mail' AS source_key,
                                        COUNT(*) AS 'queue'
                            FROM 	    mail_live
                            WHERE 	    mail_status_id = 1

                            UNION ALL

                            SELECT	    'ussd' AS source_key,
                                        COUNT(*) AS 'queue'
                            FROM 	    ussd_live

                            UNION ALL   

                            SELECT      'jorko' AS source_key,
                                        COUNT(*) AS 'queue'
                            FROM        jorko_live
                            WHERE       jorko_live.actived = 1
                            ");
        $sourceQueue = parent::getResultArray();
        
        $queueArray = array();

        foreach($sourceQueue['result'] AS $queue){
            array_push($queueArray, array($queue['source_key'] => (int)$queue['queue']));
        }

        return $queueArray;
    }




    // DICTIONARY

    public function AddIcons(){
        
    }

    public function getQueueLang(){
        parent::setQuery("  SELECT	`id`,
                                     name
                            FROM    queue_lang
                            WHERE 	actived = 1 ");

        $result = parent::getResultArray()['result'];

        return $result;
    }


    public function getIconsList(){
        parent::setQuery("  SELECT	`id`,
                                    CONCAT(`hash`,'.',`type`) as url,
                                    `original_name` as name
                            FROM    upload_files
                            WHERE 	actived = 1 AND route = 'queueIcons'
                            ORDER BY id DESC
                            LIMIT 200");

        $result = parent::getResultArray()['result'];

        return $result;
    }


    public function getIcons(){
        $colCount = $_REQUEST['count'];
        $cols     = $_REQUEST['cols'];

         parent::setQuery("  SELECT	`id`,
                                    CONCAT(`hash`,'.',`type`),
                                    '' as icon,
                                    `original_name`

                            FROM    upload_files
                            WHERE 	actived = 1 AND route = 'queueIcons'
                            ORDER BY id DESC
                            LIMIT 200");

        $callList = parent::getKendoList($colCount, $cols);

        return $callList;
    }

    public function getList(){
        $colCount = $_REQUEST['count'];
        $cols     = $_REQUEST['cols'];
        

        parent::setQuery("  SELECT	    asterisk_queue.`id`,
                                        asterisk_queue.`number`,
                                        CONCAT(upload_files.hash, '.', upload_files.type) as 'icon',
                                        queue_lang.`name` as 'lang'
                            FROM        asterisk_queue
                            LEFT JOIN   queue_lang ON queue_lang.id = asterisk_queue.lang
                            LEFT JOIN   upload_files ON upload_files.id = asterisk_queue.icon
                            WHERE 	    asterisk_queue.actived = 1 ");

        $callList = parent::getKendoList($colCount, $cols);

        return $callList;
    }

    public function getQueueModal(){

        $id = $_REQUEST['id'];

        parent::setQuery("  SELECT	    asterisk_queue.`id`,
                                        asterisk_queue.`number`,
                                        asterisk_queue.`lang`,
                                        asterisk_queue.`icon`,
                                        CONCAT(`upload_files`.`hash`,'.',`upload_files`.`type`) as `url`
                            FROM        asterisk_queue
                            LEFT JOIN   upload_files ON upload_files.id = asterisk_queue.icon
                            WHERE 	    `asterisk_queue`.`actived` = 1 AND `asterisk_queue`.`id` = '$id'");

        $queue = parent::getResultArray()['result'][0];

        return $queue;



    }


    public function changeQueue(){


        $id = $_REQUEST['id'];
        $icon = $_REQUEST['icon'];
        $lang = $_REQUEST['lang'];

        parent::setQuery(" UPDATE asterisk_queue SET icon = '$icon', lang = '$lang' WHERE id = '$id' ");
        parent::execQuery();

        http_response_code(200);
        return array("status" => "OK", "code" => "200");

    }
}

?>