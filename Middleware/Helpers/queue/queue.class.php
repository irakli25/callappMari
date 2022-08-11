<?php



use Middleware\Routers\dbClass;

class queue extends dbClass {

    function get_queue_list() {

        $sql = "SELECT number as `astNumber` FROM `asterisk_queue`";
        parent::setQuery($sql);
    
        $result = parent::getResultArray();

        return $result['result'];
        
    }

    function get_queue() {

        $sql = "SELECT number as `queue` FROM `asterisk_queue`";
        parent::setQuery($sql);
    
        $result = parent::getResultArray();

        return $result['result'];
        
    }


    public function getRequestId(){
        $chat_id = $_REQUEST['chat_id'];

        parent::setQuery("SELECT `id`, `request_name` as `name` FROM `incomming_request` WHERE chat_id = '$chat_id'");

        $result = parent::getResultArray()['result'];

        return $result[0] ?? null;
    }

  }