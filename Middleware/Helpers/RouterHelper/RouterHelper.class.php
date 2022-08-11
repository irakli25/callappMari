<?php

use Middleware\Routers\Router;

class RouterHelper extends Router{

  public function getRoute (){

    $pageId = $_REQUEST['page_id'];

    $page = parent::test($_SESSION['USERID'], $pageId);

    return array("content" => $page);

  }

}