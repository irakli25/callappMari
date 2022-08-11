<?php 

use Middleware\Routers\dbClass;

class New_ivr extends dbClass{
    
    public $colCount;
    public $cols;
    
    public function getList()
    {
       
        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        
        $startDate      = rawurldecode($_REQUEST['startDate']);
        $endDate        = rawurldecode($_REQUEST['endDate']);
        
        
        
        parent::setQuery("SELECT id,
                			     datetime,
                			     source,
                			     button,
                        	     button1
                          FROM  `ivr_buttons_log`
                          WHERE  datetime BETWEEN '$startDate' AND '$endDate'");
        $callList = parent::getKendoList($this->colCount, $this->cols);
        
        return $callList;
    }
}