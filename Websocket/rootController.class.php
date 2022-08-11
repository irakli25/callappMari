<?php

namespace Websocket;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Websocket\Request;

class RootController extends Request implements MessageComponentInterface {

    public $clients = array();
    public $Message;
    public $data;
    protected $loop;
    public $request = array();

    public function __construct($loop) {
        $this->loop = $loop;

        $that = $this; 
        $this->loop->addPeriodicTimer(1, function() use ($that) {


        });
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients[$conn->resourceId] = $conn;
        $this->clients[$conn->resourceId]->request = array();
        $this->clients[$conn->resourceId]->request['data'] = array();

        $data = array(
            'event' => EVENT_INIT,
            'data' => array(
                'client_id' => $conn->resourceId
            )
        );

        self::send($conn->resourceId, $data);

    }

    public function onMessage(ConnectionInterface $from, $msg) {

        $this->Message = json_decode($msg);
        
        if($this->Message->event){
            array_push($this->clients[$from->resourceId]->request, $this->Message->event);
        }

        if($this->Message->data){
            array_push($this->clients[$from->resourceId]->request['data'], $this->Message->data);
        }

        array_push($this->clients[$from->resourceId]->request, "OLA");
        self::send($from->resourceId, $this->clients[$from->resourceId]->request);

    }


    // SEND MESSAGE TO CLIENT
    private function send($from = null, $msg, $sendToAll = false) {
        
        if (is_array($msg) || is_object($msg)) {
            $msg = json_encode($msg);
        }

        if($sendToAll) {
            foreach ($this->clients as $client) {
                $client->send($msg);
            }
        }else{
            $this->clients[$from]->send($msg);
        }
        
    }






    // -------------------------------------------------------------------

    // Close listener
    public function onClose(ConnectionInterface $conn) {
        unset($this->clients[$conn->resourceId]);
    }

    // Error listener
    public function onError(ConnectionInterface $conn, \Exception $e) {
        parent::sLog($e->getMessage(), "CALLAPP");
        $conn->close();
    }

}