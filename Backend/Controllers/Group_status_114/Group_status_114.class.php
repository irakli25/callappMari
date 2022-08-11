<?php

use Middleware\Routers\dbClass;

class Group_status_114 extends dbClass
{
    public function getList()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("  SELECT	    `id`,
                                        `name`,
                                        `color`
                            FROM 		group_status
                            WHERE       actived = 1
                            ORDER BY    id DESC");
        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }
}
