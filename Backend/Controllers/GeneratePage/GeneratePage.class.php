<?php


use Middleware\Routers\dbClass;

/**
 * GENERATE PAGE
 * This class is used to generate the page
 * 
 */


class GeneratePage extends dbClass{


    /**
     * __construct
     * 
     * This function is the constructor for the class
     * 
     * @access public
     * @return void
     */
    public function __construct(){
        parent::__construct();
    }


    public function selector(){

        parent::setQuery("SELECT id, `number` AS `name` FROM asterisk_queue");
        
        return parent::getResultArray()['result'];

    }


}



?>