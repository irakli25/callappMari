<html>
    <head>
        <meta charset="UTF-8">
        <title>test</title>
    </head>
    <body>
        

<?php
require_once('class.Mysqli.php');
ini_set("memory_limit", "-1");
set_time_limit(0);


$db = new dbClass();


$db->setQuery(" SELECT  incomming_call.id,
                        incomming_call.call_phone,
                        incomming_call.chat_id,
                        incomming_call.fb_chat_id,
                        incomming_call.call_date,
                        incomming_call.asterisk_incomming_id,
                        incomming_call.user_id,
                        incomming_call.contact_person_surname_114,
                        incomming_call.abonent_address,
                        incomming_call.abonent_number,
                        incomming_call.abonent_name,
                        incomming_call.abonent_phone,
                        incomming_call.abonent_coment,
                        incomming_call.comment_114,
                        incomming_call.contact_person_phone_114,
                        incomming_call.contact_person_address,
                        incomming_call.region_id,
                        incomming_call.category_parent_id,
                        incomming_call.category_id,
                        incomming_call.sub_category,
                        incomming_call.category_114_id,
                        incomming_call.cal_type_114_id,
                        incomming_call.sub_category_114_id,

                        UNIX_timestamp(asterisk_incomming.call_datetime) AS call_datetime,
                        asterisk_incomming.uniqueid,
                        asterisk_incomming.user_id,
                        asterisk_incomming.wait_time,
                        asterisk_incomming.duration,
                        asterisk_incomming.disconnect_cause,
                        asterisk_incomming.file_name,
                        asterisk_incomming.source,
                        asterisk_incomming.dst_queue,
                        asterisk_extension.id AS ext_id,
                        asterisk_queue.id AS queue_id,


                        chat.name AS chat_name,
                        chat.answer_user_id,
                        chat.join_date,
                        chat.last_user_id,
                        chat.last_request_datetime,
                        chat.them_id,
                        chat.phone AS chat_phone,
                        chat.device,
                        chat.browser,
                        chat.rate AS chat_rate,
                        chat.status,


                        fb_chat.sender_name AS fb_chat_name,
                        fb_chat.last_user_id AS fb_user_id,
                        fb_chat.first_datetime AS fb_first_datetime,
                        fb_chat.last_datetime AS fb_last_datetime,
                        fb_chat.sender_id AS fb_sender_id,
                        fb_chat.sender_avatar AS sender_avatar,
                        fb_chat.status AS fb_status

                FROM    `incomming_call`
                LEFT JOIN asterisk_incomming ON asterisk_incomming.id = incomming_call.asterisk_incomming_id
                LEFT JOIN asterisk_extension ON asterisk_extension.name = asterisk_incomming.dst_extension
                LEFT JOIN asterisk_queue ON asterisk_queue.number = asterisk_incomming.dst_queue
                LEFT JOIN chat ON chat.id = incomming_call.chat_id
                LEFT JOIN fb_chat ON fb_chat.id = incomming_call.fb_chat_id
                WHERE   DATE(incomming_call.call_date) BETWEEN '2022-03-01' AND '2022-03-07'");
$inc_data = $db->getResultArray();
$prepared_quaries = "";

$chat_incr = 1;
foreach($inc_data['result'] AS $inc){
    
    if($inc['asterisk_incomming_id'] != ''){
        $prepared_quaries .= "INSERT INTO incomming_request SET id = '$inc[id]', datetime = '$inc[call_date]', source_id = 1, request_name = '$inc[call_phone]', asterisk_call_log_id = '$inc[asterisk_incomming_id]', user_id = '$inc[user_id]'; \r\n";
        $comment = $inc['abonent_coment'];
        if($inc['abonent_coment'] == ''){
            $comment = $inc['comment_114'];
        }
        
        $proc_value = json_encode(array(    "inputs" => array(  "abonenti___079" => '',
                                                                "sak_piri___439" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_surname_114'])), ENT_QUOTES),
                                                                "telefoni___396" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['call_phone'])), ENT_QUOTES),
                                                                "telefoni___987" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['call_phone'])), ENT_QUOTES),
                                                                "komentari___766" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $comment)), ENT_QUOTES),
                                                                "misamarti___180" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_address'])), ENT_QUOTES),
                                                                "telefoni2___581" => '',
                                                                "abonentis_sp_n___250" => '',
                                                                "blockis_nomeri___300" => '',
                                                                "abonentis_nomeri___019" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_number'])), ENT_QUOTES),
                                                                "momartvis_avtori___393" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_name'])), ENT_QUOTES),
                                                                "mshobeli_kvandzi___576" => '',
                                                                "ganacxadis_nomeri___793" => '',
                                                                "informaciis_ckaro___384" => '',
                                                                "sak_piri_telefoni___832" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_phone_114'])), ENT_QUOTES),
                                                                "sak_piri_misamarti___827" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_address'])), ENT_QUOTES),
                                                                "informaciis_ckaro___384" => '',
                                                                "informaciis_ckaro___384" => ''),
                                            "selectors" => array(   "raioni___531" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['region_id'])), ENT_QUOTES),
                                                                    "komunikaciis_arxi" => 1),
                                            "multilevel" => array(  "zaris_kategoriebi___594___1" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_parent_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi___594___2" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi___594___3" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['sub_category'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___1" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_114_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___2" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['cal_type_114_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___3" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['sub_category_114_id'])), ENT_QUOTES))), JSON_UNESCAPED_UNICODE);
        
        $prepared_quaries .= "INSERT INTO processing SET datetime = '$inc[call_date]', processing_page_id = 1, row_id = '$inc[id]', value = '$proc_value'; \r\n";
        $call_status = 404;
        if($inc['disconnect_cause'] == 'COMPLETEAGENT'){
            $call_status = 6;
        }    
        else if($inc['disconnect_cause'] == 'COMPLETECALLER'){
            $call_status = 7;
        }
        else if($inc['disconnect_cause'] == 'ABANDON'){
            $call_status = 9;
        }

        $prepared_quaries .= "INSERT INTO asterisk_call_log SET id = '$inc[asterisk_incomming_id]',
                                                                call_type_id = 1,
                                                                call_datetime = '$inc[call_datetime]',
                                                                unique_id = '$inc[uniqueid]',
                                                                source = '$inc[source]',
                                                                did = '$inc[dst_queue]',
                                                                queue_id = '$inc[queue_id]',
                                                                extension_id = '$inc[ext_id]',
                                                                wait_time = '$inc[wait_time]',
                                                                talk_time = '$inc[duration]',
                                                                call_status_id = '$call_status'; \r\n";

        $file_name = explode('.', $inc['file_name']);
        $baseName = $file_name[0].'.'.$file_name[1];
        $prepared_quaries .= "INSERT INTO asterisk_call_record SET asterisk_call_log_id = '$inc[asterisk_incomming_id]', name = '$baseName', format = '$file_name[2]'; \r\n";

    }
    else if($inc['chat_id'] != ''){
        $prepared_quaries .= "INSERT INTO incomming_request SET id = '$inc[id]', datetime = '$inc[call_date]', source_id = 2, request_name = '$inc[call_phone]', chat_id = '$chat_incr', user_id = '$inc[user_id]'; \r\n";
        $comment = $inc['abonent_coment'];
        if($inc['abonent_coment'] == ''){
            $comment = $inc['comment_114'];
        }

        $proc_value = json_encode(array(    "inputs" => array(  "abonenti___079" => '',
                                                                "sak_piri___439" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_surname_114'])), ENT_QUOTES),
                                                                "telefoni___396" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['call_phone'])), ENT_QUOTES),
                                                                "telefoni___987" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['call_phone'])), ENT_QUOTES),
                                                                "komentari___766" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $comment)), ENT_QUOTES),
                                                                "misamarti___180" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_address'])), ENT_QUOTES),
                                                                "telefoni2___581" => '',
                                                                "abonentis_sp_n___250" => '',
                                                                "blockis_nomeri___300" => '',
                                                                "abonentis_nomeri___019" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_number'])), ENT_QUOTES),
                                                                "momartvis_avtori___393" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['chat_name'])), ENT_QUOTES),
                                                                "mshobeli_kvandzi___576" => '',
                                                                "ganacxadis_nomeri___793" => '',
                                                                "informaciis_ckaro___384" => '',
                                                                "sak_piri_telefoni___832" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_phone_114'])), ENT_QUOTES),
                                                                "sak_piri_misamarti___827" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_address'])), ENT_QUOTES),
                                                                "informaciis_ckaro___384" => '',
                                                                "informaciis_ckaro___384" => ''),
                                            "selectors" => array(   "raioni___531" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['region_id'])), ENT_QUOTES),
                                                                    "komunikaciis_arxi" => 2),
                                            "multilevel" => array(  "zaris_kategoriebi___594___1" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_parent_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi___594___2" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi___594___3" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['sub_category'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___1" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_114_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___2" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['cal_type_114_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___3" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['sub_category_114_id'])), ENT_QUOTES))), JSON_UNESCAPED_UNICODE);
        $prepared_quaries .= "INSERT INTO processing SET datetime = '$inc[call_date]', processing_page_id = 1, row_id = '$inc[id]', value = '$proc_value'; \r\n";

        $prepared_quaries .= "INSERT INTO chat SET  id = '$chat_incr',
                                                    first_user_id = '$inc[answer_user_id]',
                                                    first_datetime = '$inc[join_date]',
                                                    last_user_id = '$inc[last_user_id]',
                                                    last_datetime = '$inc[last_request_datetime]',
                                                    source_id = 2,
                                                    account_id = 1,
                                                    them_id = '$inc[them_id]',
                                                    sender_name = '$inc[chat_name]',
                                                    sender_phone = '$inc[chat_phone]',
                                                    sender_device = '$inc[device]',
                                                    sender_browser = '$inc[browser]',
                                                    chat_rate = '$inc[chat_rate]',
                                                    chat_status_id = '$inc[status]'; \r\n";

        $db->setQuery(" SELECT  operator_user_id,
                                message_datetime,
                                message_client,
                                message_operator
                        FROM    chat_details
                        WHERE   chat_id = '$inc[chat_id]'
                        ORDER BY id ASC");

        $chatDetails = $db->getResultArray();
        
        foreach($chatDetails['result'] AS $details){

            if($details['operator_user_id'] == 0){
                $message = $db->escape_string($details['message_client']);
            }
            else{
                $message = $db->escape_string($details['message_operator']);
            }

            $prepared_quaries .= "INSERT INTO chat_details SET source_id = 2, user_id = '$details[operator_user_id]', chat_id = '$chat_incr', message = '$message', datetime = '$details[message_datetime]'; \r\n";
        }

        $chat_incr++;
    }
    else if($inc['fb_chat_id'] != ''){
        $prepared_quaries .= "INSERT INTO incomming_request SET id = '$inc[id]', datetime = '$inc[call_date]', source_id = 3, request_name = '$inc[abonent_phone]', chat_id = '$chat_incr', user_id = '$inc[user_id]'; \r\n";
        $comment = $inc['abonent_coment'];
        if($inc['abonent_coment'] == ''){
            $comment = $inc['comment_114'];
        }

        $proc_value = json_encode(array(    "inputs" => array(  "abonenti___079" => '',
                                                                "sak_piri___439" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_surname_114'])), ENT_QUOTES),
                                                                "telefoni___396" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_phone'])), ENT_QUOTES),
                                                                "telefoni___987" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_phone'])), ENT_QUOTES),
                                                                "komentari___766" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $comment)), ENT_QUOTES),
                                                                "misamarti___180" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_address'])), ENT_QUOTES),
                                                                "telefoni2___581" => '',
                                                                "abonentis_sp_n___250" => '',
                                                                "blockis_nomeri___300" => '',
                                                                "abonentis_nomeri___019" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['abonent_number'])), ENT_QUOTES),
                                                                "momartvis_avtori___393" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['fb_chat_name'])), ENT_QUOTES),
                                                                "mshobeli_kvandzi___576" => '',
                                                                "ganacxadis_nomeri___793" => '',
                                                                "informaciis_ckaro___384" => '',
                                                                "sak_piri_telefoni___832" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_phone_114'])), ENT_QUOTES),
                                                                "sak_piri_misamarti___827" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['contact_person_address'])), ENT_QUOTES),
                                                                "informaciis_ckaro___384" => '',
                                                                "informaciis_ckaro___384" => ''),
                                            "selectors" => array(   "raioni___531" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['region_id'])), ENT_QUOTES),
                                                                    "komunikaciis_arxi" => 3),
                                            "multilevel" => array(  "zaris_kategoriebi___594___1" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_parent_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi___594___2" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi___594___3" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['sub_category'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___1" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['category_114_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___2" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['cal_type_114_id'])), ENT_QUOTES),
                                                                    "zaris_kategoriebi_114___726___3" => htmlspecialchars(trim(preg_replace('/\s+/', ' ', $inc['sub_category_114_id'])), ENT_QUOTES))), JSON_UNESCAPED_UNICODE);
        $prepared_quaries .= "INSERT INTO processing SET datetime = '$inc[call_date]', processing_page_id = 1, row_id = '$inc[id]', value = '$proc_value'; \r\n";


        $prepared_quaries .= "INSERT INTO chat SET  id = '$chat_incr',
                                                    first_user_id = '$inc[fb_user_id]',
                                                    first_datetime = '$inc[fb_first_datetime]',
                                                    last_user_id = '$inc[fb_user_id]',
                                                    last_datetime = '$inc[fb_last_datetime]',
                                                    source_id = 3,
                                                    account_id = 1,
                                                    sender_name = '$inc[fb_chat_name]',
                                                    sender_id = '$inc[fb_sender_id]',
                                                    sender_avatar = '$inc[sender_avatar]',
                                                    chat_status_id = '$inc[fb_status]'; \r\n";

        $db->setQuery(" SELECT  user_id,
                                datetime,
                                text

                        FROM    fb_messages
                        WHERE   fb_chat_id = '$inc[fb_chat_id]'
                        ORDER BY id ASC");

        $chatDetails = $db->getResultArray();
        
        foreach($chatDetails['result'] AS $details){

            $message = $db->escape_string($details['text']);

            $prepared_quaries .= "INSERT INTO chat_details SET source_id = 3, user_id = '$details[user_id]', chat_id = '$chat_incr', message = '$message', datetime = '$details[datetime]'; \r\n";
        }

        $chat_incr++;
    }
}




//print_r($prepared_quaries);

file_put_contents("output.txt", $prepared_quaries);

echo 'OK!!!';
?>





    </body>
</html>
