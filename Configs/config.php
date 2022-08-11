<?php

/**
 * CONFIG FILE
 */

ini_set("display_errors", true);
error_reporting(E_ERROR);

define("APP_PATH",    "http://localhost/Projects/TDG/callappcore");
define("APP_IP",      "192.168.0.116"); // 192.168.0.116
define("APP_PORT",    "8085");

require_once "sql.config.php";
require_once "am.config.php";
require_once "defines.config.php";

session_start();

spl_autoload_register(function($class) {
    require_once str_replace('\\', '/', $class) . '.class.php';
  });



?>