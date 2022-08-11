<?php

namespace Controllers\IncommingTabs;

use Middleware\Routers\dbClass;

class news extends dbClass{

    public function GET($colCount,$cols,$status_id){

        $status_id = urldecode($_REQUEST['status_id']);
        $filter = "";

        if(empty($status_id) || $status_id == 1 || $status_id == 3){
            $filter = " AND news.archived = 0 AND tab_id = '$status_id'";
        }else{
            $filter = " AND news.archived = 1 ";
        }

        parent::setQuery("   SELECT	    news.id,
                                news.start_date,
                                news.end_date,
                                news.name,
                                news.description,
                                user_info.name,
                                news_tabs.name
                        FROM 		news
                        LEFT JOIN   users ON users.id = news.user_id
                        LEFT JOIN   `user_info` ON `user_info`.user_id = `users`.id
                        LEFT JOIN   news_tabs ON news_tabs.id = news.tab_id
                        WHERE news.actived = 1 $filter
                        ORDER BY    news.id DESC ");

        $callList = parent::getKendoList($colCount, $cols);
        
        return $callList;
    }
 
}