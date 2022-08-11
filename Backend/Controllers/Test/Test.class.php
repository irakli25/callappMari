<?php

use Middleware\Routers\dbClass;

class Test extends dbClass{
    
 
    public function getData() {
        
        parent::setQuery("SELECT * FROM _dev_websocket_test WHERE actived = 1");

        return parent::getResultArray()['result'];


    }



}




?>