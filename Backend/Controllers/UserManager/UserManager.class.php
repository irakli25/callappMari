<?php

use Mpdf\Tag\P;

use Middleware\Routers\dbClass;

class UserManager extends dbClass
{
    public function getList()
    {
        $colCount = $_REQUEST['count'];
        $cols     = $_REQUEST['cols'];

        parent::setQuery("  SELECT 	users.id,
                                    user_info.`name` AS momxmarebeli,
                                    asterisk_extension.`name` AS `eqstensheni`,
                                    user_info.mobile_number AS mobiluri,
                                    `position`.`name` AS `tanamdeboba`,
                                    user_info.address AS misamarti
                            FROM `users`
                            JOIN `user_info` ON user_info.user_id = users.id
                            LEFT JOIN asterisk_extension ON asterisk_extension.id = users.extension_id AND asterisk_extension.actived = 1
                            LEFT JOIN `position` ON users.position_id = `position`.id
                            WHERE users.actived = 1 
                            ORDER BY users.id DESC");

        $result = parent::getKendoList($colCount, $cols);
        return $result;
    }

    public function getPosition()
    {
        parent::setQuery("  SELECT  `id`,
                                    `name`
                            FROM `position`
                            WHERE actived = 1");
        $result = parent::getResultArray()['result'];
        return $result;
    }

    public function getDepartment()
    {
        parent::setQuery("  SELECT  `id`,
                                    `name`
                            FROM `department`
                            WHERE actived = 1");
        $result = parent::getResultArray()['result'];
        return $result;
    }

    public function getExtension()
    {
        parent::setQuery("  SELECT  `id`,
                                    `name`
                            FROM `asterisk_extension`
                            WHERE actived = 1");
        $result = parent::getResultArray()['result'];
        return $result;
    }

    public function getGroup()
    {
        parent::setQuery("  SELECT  `id`,
                                    `name`
                            FROM `group`
                            WHERE actived = 1");
        $result = parent::getResultArray()['result'];
        return $result;
    }

    public function GET()
    {
        $user_id = $_REQUEST['id'];

        parent::setQuery("  SELECT 	users.*,
                                    user_info.*,
                                    CONCAT(upload_files.hash,'.', upload_files.type) as filename,
                                    group_concat(users_chat_temes.chat_temes_id) as chat_temes_ids
                            FROM `users`
                            JOIN `user_info` ON user_info.user_id = users.id
                            LEFT JOIN   upload_files ON upload_files.id = user_info.image
                            LEFT JOIN   users_chat_temes ON users_chat_temes.user_id = users.id
                            WHERE users.actived = 1 AND users.id = '$user_id'");

        $result = parent::getResultArray()['result'][0];
        return $result;
    }

    public function ADD()
    {
        $position_id = $_REQUEST['position_id'];
        $username = $_REQUEST['userName'];
        $password = md5($_REQUEST['password']);
        $group_id = $_REQUEST['group_id'];
        $extension_id = $_REQUEST['extension_id'];
        $name = $_REQUEST['nameSurname'];
        $tin = $_REQUEST['personalNumber'];
        $department_id = $_REQUEST['department_id'];
        $email = $_REQUEST['email'];
        $address = $_REQUEST['address'];
        $mobile_number = $_REQUEST['mobile'];
        $comment = $_REQUEST['comment'];
        $service_center_id = $_REQUEST['service_center_id'];
        $chat_theme_ids = $_REQUEST['chat_theme_ids'];
        $image = $_REQUEST['image'];

        parent::setQuery("INSERT INTO users(`username`,`password`,`position_id`,`group_id`,`extension_id`)
                                        VALUES('$username','$password','$position_id','$group_id','$extension_id')");
        parent::execQuery();

        $getLastId = parent::getLastId();

        parent::setQuery("INSERT INTO user_info(`user_id`,`name`,`tin`,`department_id`,`email`,`address`,`mobile_number`,`comment`,`image`,`service_center_id`)
                                    VALUES ('$getLastId','$name','$tin','$department_id','$email','$address','$mobile_number','$comment','$image','$service_center_id')");
        parent::execQuery();

        if (!empty($chat_theme_ids)) {
            $chat_theme_ids = explode(',', $chat_theme_ids);

            foreach ($chat_theme_ids as $id) {
                parent::setQuery("INSERT INTO users_chat_temes(`user_id`,`chat_temes_id`)
                                                           VALUES('$getLastId','$id') ON DUPLICATE KEY UPDATE `user_id` = '$id'");
                parent::execQuery();
            }
        }

        return array("status" => "OK");
    }

    public function UPDATE()
    {
        $position_id = $_REQUEST['position_id'];
        $username = $_REQUEST['userName'];
        $password = $_REQUEST['password'];
        $group_id = $_REQUEST['group_id'];
        $extension_id = $_REQUEST['extension_id'];
        $name = $_REQUEST['nameSurname'];
        $tin = $_REQUEST['personalNumber'];
        $department_id = $_REQUEST['department_id'];
        $email = $_REQUEST['email'];
        $address = $_REQUEST['address'];
        $mobile_number = $_REQUEST['mobile'];
        $comment = $_REQUEST['comment'];
        $id = $_REQUEST['id'];
        $image = $_REQUEST['image'];
        $service_center_id = $_REQUEST['service_center_id'];
        $chat_theme_ids = $_REQUEST['chat_theme_ids'];
        $chat_theme_ids_old = $_REQUEST['chat_theme_ids_old'];

        if ($password == "**z**1**m**") {
            parent::setQuery("  UPDATE users 
            SET `username` = '$username',
                `position_id` = '$position_id',
                `group_id` = '$group_id',
                `extension_id` = '$extension_id',
                `actived` = 1
            WHERE `id` = '$id'");
            parent::execQuery();
        } else {
            $password = md5($password);
            parent::setQuery("  UPDATE users 
            SET `username` = '$username',
                `password` = '$password',
                `position_id` = '$position_id',
                `group_id` = '$group_id',
                `extension_id` = '$extension_id',
                `actived` = 1
            WHERE `id` = '$id'");
            parent::execQuery();
        }

        parent::setQuery("  UPDATE user_info 
            SET `name` = '$name',
                `tin` = '$tin',
                `department_id` = '$department_id',
                `email` = '$email',
                `address` = '$address',
                `mobile_number` = '$mobile_number',
                `comment` = '$comment',
                `image` = '$image',
                `service_center_id` = '$service_center_id'
            WHERE `user_id` = '$id'");
        parent::execQuery();

        if (!empty($chat_theme_ids_old)) {
            parent::setQuery("  DELETE FROM users_chat_temes 
            WHERE `user_id` = '$id'");
            parent::execQuery();
        }

        if (!empty($chat_theme_ids)) {
            $chat_theme_ids = explode(',', $chat_theme_ids);

            foreach ($chat_theme_ids as $t_id) {
                parent::setQuery("INSERT INTO users_chat_temes(`user_id`,`chat_temes_id`)
                                                        VALUES('$id','$t_id') ON DUPLICATE KEY UPDATE `user_id` = '$id'");
                parent::execQuery();
            }
        }

        return array("status" => "OK");
    }

    public function GET_SERVICE_CENTER()
    {

        parent::setQuery("  SELECT 	 `id`, `name`
                            FROM	 `service_center`
                            WHERE    actived = 1");

        return parent::getResultArray()['result'];
    }

    public function GET_CHATTHEMES()
    {

        parent::setQuery("  SELECT 	 `id`, `name`
                            FROM	 `chat_temes`
                            WHERE    actived = 1");

        return parent::getResultArray()['result'];
    }


    public function DELETE()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE users
                            SET `actived` = '0'
                            WHERE id = '$id'");

        parent::execQuery();

        return array("status" => "ok");
    }
}
