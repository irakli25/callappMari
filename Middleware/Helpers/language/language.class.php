<?php

namespace Middleware\Helpers\language;

use Middleware\Routers\dbClass;

class Language extends dbClass
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getLanguageData($page_id)
    {

        $lang_id = @$_SESSION['LANGID'] ? $_SESSION['LANGID'] : 1;

        parent::setQuery("SELECT        `lang_key`.`key`, 
                                        IF(ISNULL(`lang_value`.`value`), `lang_key`.`key`, value) AS `value`
                            FROM        `lang_key`
                            JOIN        `lang_page`    ON `lang_key`.id = `lang_page`.`key_id`
                            LEFT JOIN   `lang_value`  ON `lang_value`.`key_id` = `lang_page`.`key_id`  AND `lang_value`.`lang_id` = '$lang_id'
                            WHERE       `lang_page`.`page_id` = '$page_id'");

        $result = parent::getResultArray();

        $data = array();


        if ($result['count'] > 0) {

            foreach ($result['result'] as $key => $value) {
                $data[$value['key']] = $value['value'];
            }

            return array("langData" => $data);
        } else {
            return array("langData" => null);
        }
    }
}
