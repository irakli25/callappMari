<?php

/**
 * route: Profile
 */
use Middleware\Routers\dbClass;

class Profile extends dbClass
{
        public function getUserInfo()
        {
            $user_id = $_REQUEST['user_id'];
            
            parent::setQuery("  SELECT      user_info.`name`,
                                            fb.link AS fb_link,
                                            instagram.link AS instagram_link,
                                            linkedin.link AS linkedin_link,
                                            twitter.link AS twitter_link,
                                            user_info.address,
                                            user_info.mail,
                                            user_info.mobile_number,
                                            user_info.raiting_number,
                                            user_info.raiting_star,
                                            user_info.birth_date,
                                            user_info.work_place,
                                            user_info.job,
                                            user_info.region,
                                            user_info.image,
                                            user_info.company_name,
                                            responsible_user.`name` AS responsible_user,
                                            IF(user_info.gender_id = 1,'მამრობითი','მდედრობითი') AS gender,
                                            user_info.language,
                                            department.`name` AS department,
                                            CONCAT(' [', GROUP_CONCAT(JSON_OBJECT('id',all_departments.id,'name',all_departments.`name`)), '\"}]')  AS all_departments
                                    
                                FROM        user_info
                                LEFT JOIN   user_social_network AS fb ON fb.user_id = user_info.user_id AND fb.actived = 1
                                LEFT JOIN   user_social_network AS instagram ON instagram.user_id = user_info.user_id AND instagram.actived = 1
                                LEFT JOIN   user_social_network AS linkedin ON linkedin.user_id = user_info.user_id AND linkedin.actived = 1
                                LEFT JOIN   user_social_network AS twitter ON twitter.user_id = user_info.user_id AND twitter.actived = 1
                                LEFT JOIN   user_info AS responsible_user ON user_info.responsible_user_id = responsible_user.user_id AND user_info.actived = 1 
                                LEFT JOIN   department ON user_info.department_id = department.id AND department.actived = 1
                                LEFT JOIN   task ON user_info.user_id = task.user_id
                                LEFT JOIN   department AS all_departments ON all_departments.actived = 1
                                WHERE       user_info.user_id = $user_id AND user_info.actived = 1
                                GROUP BY    user_info.id; ");

            $result = parent::getResultArray()["result"];

            for ($i = 0; $i < COUNT($result); $i++ ) 
                $result[$i]["all_departments"] = json_decode($result[$i]["all_departments"],true);
            
            return $result;
        }

        public function getDepartment(){
            
            parent::setQuery("  SELECT id,name
                                FROM department ");

            $result = parent::getResultArray()["result"];            
            return $result;
        }

        public function getResponsibleUser(){
            parent::setQuery("  SELECT id,name
                                FROM user_info 
                                WHERE actived > 0");

            $result = parent::getResultArray()["result"];            
            return $result;
        }

        public function updateUserInfo()
        {
            $user_id = $_REQUEST['user_id'];
            
            $mail               = $_REQUEST['mail'];
            $gender             = $_REQUEST['gender'];
            $address            = $_REQUEST['address'];
            $language           = $_REQUEST['language'];
            $birth_date         = $_REQUEST['birth_date'];
            $work_place         = $_REQUEST['work_place'];
            $company_name       = $_REQUEST['company_name'];
            $mobile_number      = $_REQUEST['mobile_number'];
            $department_id      = $_REQUEST['department_id'];
            $responsible_user   = $_REQUEST['responsible_user'];
            
            $gender_id          = ($gender == "მამრობითი") ? 1 : 2 ;

            parent::setQuery("  UPDATE  user_info
                                SET     department_id       = $department_id,
                                        work_place          = '$work_place',
                                        mobile_number       = $mobile_number,
                                        address             = '$address',
                                        mail                = '$mail',
                                        birth_date          = '$birth_date',
                                        language            = '$language',
                                        gender_id           = $gender_id,
                                        company_name        = '$company_name',
                                        responsible_user_id = $responsible_user
                                WHERE   user_info.user_id   = $user_id; ");
            parent::execQuery();
        }

        public function editWorkPlace()
        {
            $user_id =      $_REQUEST["user_id"];
            $region =       $_REQUEST["region"];
            $work_place =   $_REQUEST["work_place"];

            parent::setQuery("  UPDATE  user_info 
                                SET     work_place =    '$work_place',
                                        region =        '$region',
                                WHERE   id = $user_id");
            parent::execQuery();
        }

        public function editContact()
        {
            $user_id =  $_REQUEST["user_id"];
            $mail =     $_REQUEST["mail"];
            $number =   $_REQUEST["number"];
            $address =  $_REQUEST["address"];

            parent::setQuery("  UPDATE  user_info 
                                SET     mobile_number = '$number',
                                        address =       '$address',
                                        mail =          '$mail'
                                WHERE   id = $user_id");
            parent::execQuery();
        }

        public function editMainInfo()
        {
            $user_id =      $_REQUEST["user_id"];
            $gender =       $_REQUEST["gender"];
            $language =     $_REQUEST["language"];
            $birth_date =   $_REQUEST["birth_date"];

            $gender_id =    ($gender == "მამრობითი") ? 1 : 2 ;
            
            parent::setQuery("  UPDATE  user_info 
                                SET     gender_id =     '$gender_id',
                                        language =      '$language',
                                        birth_date =    '$birth_date'
                                WHERE   id = $user_id");
            parent::execQuery();
        }

        public function editCompanyInfo()
        {
            $user_id =          $_REQUEST["user_id"];
            $company_name =     $_REQUEST["company_name"];
            $department_id =    $_REQUEST["department_id"];
            $responsible_user = $_REQUEST["responsible_user"];
            
            parent::setQuery("  UPDATE  user_info 
                                SET     company_name =      '$company_name',
                                        department_id =     '$department_id',
                                        responsible_user =  '$responsible_user'
                                WHERE   id = $user_id");
            parent::execQuery();
        }

        public function getTasks() 
        {
            
        }

        public function getCalendar() 
        {
            
        }
}
