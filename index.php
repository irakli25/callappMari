<?php

/**
 *  CORE
 *  CALLAPP END POINT BUILDER
 *  @version v1.1
 *  
 */

require_once "Configs/config.php";

class Core {

    public $route;
    public $method;
    public $namespace;

    public $url;

    public $type;
    public $folder;
    public $name;

    public $object;
    public $response;

    public function __construct($route, $method, $namespace, $url){
        
        $this->route = $route;
        $this->method = $method;
        $this->namespace = $namespace;
        $this->url = $url;

        $this->Configure();

    }

    private function Configure(){


        if(isset($this->route) && isset($this->method) && isset($this->namespace)){

            $this->type         = "Middleware".DIRECTORY_SEPARATOR;
            $this->namespace    .= DIRECTORY_SEPARATOR;
            $this->folder       = $this->route . DIRECTORY_SEPARATOR;
            $this->name         = $this->route.".class.php";
            
        }else if(isset($this->route) && isset($this->method) && !isset($this->url)){
           
            $this->type         = "Backend".DIRECTORY_SEPARATOR;
            $this->namespace    = 'Controllers'. DIRECTORY_SEPARATOR;
            $this->folder       = $this->route . DIRECTORY_SEPARATOR;
            $this->name         = $this->route.".class.php";
        }
        
        if(isset($this->url)){
            $this->namespace = 'Backend'. "/";
            $this->name         = $this->route.".class.php";
        }

        $this->Request();
    }
 

    public function Request(){
        // var_dump($this->type . $this->namespace  . $this->folder . $this->url . $this->name);
        if(file_exists(urldecode($this->type . $this->namespace  . $this->folder . $this->url . $this->name))){
            
            require_once urldecode($this->type . $this->namespace  . $this->folder . $this->url . $this->name);

            if(!$this->route) return false;
            
            $this->object = new $this->route;
            $method = $this->method;
           
            $this->response = $this->object->$method();
            
        }else{
            $this->response = null;
        }

       

        $this->Response();

    }

    public function Response(){

        // if (is_null($this->response)) print json_encode(array("message" => "URL IS NOT CORRECT. PLEASE CHECK AND TRY AGAIN", "code" => 404));

        if (!is_null($this->response)) print json_encode($this->response);
        

    }

    
}



/**
 * ********************************************************
 */
if(isset($_REQUEST['route']) || isset($_REQUEST['act']) || isset($_REQUEST['ns']) || isset($_REQUEST['url'])) {
    $core = new Core(@$_REQUEST['route'], @$_REQUEST['act'], @$_REQUEST['ns'], @$_REQUEST['url']);
}else{
    require_once "Frontend/Views/index.php";
}

