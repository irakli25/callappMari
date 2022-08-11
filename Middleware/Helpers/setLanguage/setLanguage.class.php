<?php


use Middleware\Routers\dbClass;

class setLanguage extends dbClass
{
    public function __construct()
    {
        parent::__construct();
    }

    public function changeLanguage() {

        $langId = $_REQUEST['lang_id'];

        parent::setQuery("UPDATE `user_info` SET `lang_id` = '$langId' WHERE `user_info`.`id` = '$_SESSION[USERID]'");
        parent::execQuery();

        $_SESSION['LANGID'] = $langId;

        return array("code" => "200", "message" => "OK");

    }
}