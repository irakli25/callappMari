<?php

use Middleware\Routers\dbClass;

class Service_center_group_114 extends dbClass
{
    public function getList()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("  SELECT 	  service_center_group_114.id,
                                        service_center_group_114.`name`,
                                        service_center_group_114.planshet_id,
                                        GROUP_CONCAT(group_members.`name`),
                                        service_center_group_114.number,
                                        service_center.name
                                FROM 	  service_center_group_114
                                LEFT JOIN service_center_group_114_ostats ON service_center_group_114_ostats.service_center_group_114_id = service_center_group_114.id
                                LEFT JOIN group_members ON group_members.id = service_center_group_114_ostats.ostat_id AND group_members.actived = 1
                                LEFT JOIN service_center ON service_center.id = service_center_group_114.service_center_id
                                WHERE 	  service_center_group_114.actived=1
                                GROUP BY  service_center_group_114.id
                                ORDER BY  service_center_group_114.id DESC");
        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getSubTableData()
    {
        $id_114 = $_REQUEST['id_114'];

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];


        parent::setQuery("SELECT 	  `service_center_group_114_ostats`.`id`,
                                        `group_members`.`name`,
                                        IF(status = 1, 'აქტიური', 'გაუქმებული')
                                FROM 	  `service_center_group_114_ostats`
                                LEFT JOIN  group_members ON group_members.id = `service_center_group_114_ostats`.ostat_id AND group_members.actived = 1
                                WHERE 	  `service_center_group_114_ostats`.`service_center_group_114_id`=$id_114
                                ORDER BY service_center_group_114_ostats.id DESC");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getSelectors()
    {

        parent::setQuery("SELECT id,name 
                         FROM `service_center`
                         WHERE actived = 1");

        return parent::getResultArray()['result'];
    }

    public function getSelectorsName()
    {

        parent::setQuery("SELECT 	`id`,
                                    `name`
                            FROM 	`group_members`
                            WHERE 	 actived=1 AND type_id = 3");

        return parent::getResultArray()['result'];
    }

    public function getNewId()
    {
        parent::setQuery("INSERT INTO service_center_group_114(`name`)
        VALUES('')");

        parent::execQuery();

        $lastId = parent::getLastId();

        parent::setQuery("DELETE FROM service_center_group_114
                            WHERE id = '$lastId'");

        parent::execQuery();



        return $lastId;
    }

    public function getById()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("SELECT `service_center_group_114`.`id`,
                                    `service_center_group_114`.`name`,
                                    `service_center_group_114`.`planshet_id`,
                                    `service_center_group_114`.`number`,
                                    `service_center_group_114`.`service_center_id`
                            FROM   `service_center_group_114`
                            WHERE  `service_center_group_114`.`id` = $id");
        $result = parent::getResultArray()['result'][0];

        if (empty($result['id'])) {
            $result = array('id' => 0);
        }

        return $result;
    }

    public function INSERT()
    {
        $insert_114_id     = $_REQUEST['id'];
        $user_id           = $_SESSION['USERID'];
        $call_name         = $_REQUEST['name'];
        $service_center_id = $_REQUEST['service_center_id'];
        $planshet_id       = $_REQUEST['planshet_id'];
        $automobile_number = $_REQUEST['automobile_number'];

        parent::setQuery("INSERT INTO `service_center_group_114`
                                        (`id`, `user_id`,`name`, `planshet_id`, `service_center_id`, `number`)
                                VALUES
                                        ('$insert_114_id', '$user_id', '$call_name', '$planshet_id', '$service_center_id', '$automobile_number') ON DUPLICATE KEY UPDATE actived = 1;");

        parent::execQuery();

        return array("status" => "ok");
    }

    public function UPDATE()
    {
        $call_id     = $_REQUEST['id'];
        $user_id           = $_SESSION['USERID'];
        $call_name         = $_REQUEST['name'];
        $service_center_id = $_REQUEST['service_center_id'];
        $planshet_id       = $_REQUEST['planshet_id'];
        $automobile_number = $_REQUEST['automobile_number'];

        parent::setQuery("UPDATE `service_center_group_114`
                            SET `user_id`           = '$user_id',
                                `name`              = '$call_name',
                                `planshet_id`       = '$planshet_id',
                                `service_center_id` = '$service_center_id',
                                `number`            = '$automobile_number'
                        WHERE	`id`                = '$call_id'");


        parent::execQuery();

        return array("status" => "ok");
    }

    public function DELETE()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE service_center_group_114
                            SET `actived` = '0'
                            WHERE id = '$id'");

        parent::execQuery();

        return array("status" => "ok");
    }

    public function ADDSELECTED()
    {
        $id_114         = $_REQUEST['group_id'];
        $ostati_name_id = $_REQUEST['name_id'];
        $password       = $_REQUEST['password'];
        $password       = md5($password);

        parent::setQuery("INSERT INTO `service_center_group_114_ostats`
                                    (`service_center_group_114_id`,`ostat_id`, `password`)
                            VALUES 
                                    ($id_114, $ostati_name_id, '$password');");
        parent::execQuery();

        return array("status" => "ok");
    }

    public function DeleteOStat()
    {
        $id    = $_REQUEST['id'];

        parent::setQuery("UPDATE service_center_group_114_ostats
                                    SET status = 0
                                WHERE id = $id");
        parent::execQuery();

        return array("status" => "ok");
    }
}
