<?php

use Middleware\Routers\dbClass;

class Group_114 extends dbClass
{
    public function getList()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("  SELECT 	  group_114.id,
                                    group_114.`name`,
                                    grp_memb.name,
                                    group_members.name,
                                    group_114.number
                            FROM 	  group_114
                            LEFT JOIN group_114_ostats ON group_114_ostats.group_114_id = group_114.id AND group_114_ostats.`status` = 1
                            LEFT JOIN group_114_zeinkali ON group_114_zeinkali.group_114_id = group_114.id AND group_114_zeinkali.`status` = 1
                            LEFT JOIN group_members ON group_members.id = group_114_ostats.ostat_id AND group_members.actived = 1
                            LEFT JOIN group_members AS grp_memb ON grp_memb.id = group_114_zeinkali.zeinkal_id AND grp_memb.actived = 1
                            WHERE 	  group_114.actived=1
                            ORDER BY group_114.id DESC");
        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getSubTableData()
    {
        $id_114 = $_REQUEST['id_114'];

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $type = $_REQUEST['type'];
        $table_name = "";
        $id = "";

        if ($type == 1) {
            $table_name = 'group_114_zeinkali';
            $id = 'zeinkal_id';
        }

        if ($type == 2) {
            $table_name = 'group_114_ostats';
            $id = 'ostat_id';
        }

        if ($type == 3) {
            $table_name = 'group_114_damxmare';
            $id = 'damxmare_id';
        }

        parent::setQuery("SELECT `$table_name`.`id`,
                                `group_members`.`name`,
                                IF(status = 1, 'აქტიური', 'გაუქმებული')
                                FROM 	  `$table_name`
                                LEFT JOIN  group_members ON group_members.id = `$table_name`.$id AND group_members.actived = 1
                          WHERE 	  `$table_name`.`group_114_id`=$id_114
                          ORDER BY $table_name.id DESC");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getSelectors()
    {
        $type = $_REQUEST['type'];

        parent::setQuery("SELECT id,name 
                         FROM `group_members`
                         WHERE actived = 1 AND type_id = $type");

        return parent::getResultArray()['result'];
    }

    public function getNewId()
    {
        parent::setQuery("INSERT INTO group_114(`name`)
        VALUES('')");

        parent::execQuery();

        $lastId = parent::getLastId();

        parent::setQuery("DELETE FROM group_114
                            WHERE id = '$lastId'");

        parent::execQuery();



        return $lastId;
    }

    public function getById()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("SELECT `group_114`.`id`,
                                `group_114`.`name`,
                                `group_114`.`number`,
                                '**z**1**m**' as `password`
                        FROM   `group_114`
                        WHERE  `group_114`.`id` = $id");
        $result = parent::getResultArray()['result'][0];

        if (empty($result['id'])) {
            $result = array('id' => 0);
        }

        return $result;
    }

    public function INSERT()
    {
        $id = $_REQUEST['id'];
        $name = $_REQUEST['name'];
        $number = $_REQUEST['number'];
        $password = $_REQUEST['password'];

        parent::setQuery("INSERT INTO group_114(`id`,`name`,`number`,`password`)
                                        VALUES('$id','$name','$number','$password')");

        parent::execQuery();

        return array("status" => "ok");
    }

    public function UPDATE()
    {
        $id = $_REQUEST['id'];
        $name = $_REQUEST['name'];
        $number = $_REQUEST['number'];
        $password = $_REQUEST['password'];

        if ($password == "**z**1**m**") {
            parent::setQuery("UPDATE group_114
                                SET `name` = '$name',
                                    `number` = '$number'
                                WHERE id = '$id'");
        } else {
            parent::setQuery("UPDATE group_114
                                SET `name` = '$name',
                                    `number` = '$number',
                                    `password` = '$password'
                                WHERE id = '$id'");
        }

        parent::execQuery();

        return array("status" => "ok");
    }

    public function DELETE()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE group_114
                            SET `actived` = '0'
                            WHERE id = '$id'");

        parent::execQuery();

        return array("status" => "ok");
    }

    public function ADDSELECTED()
    {
        $group_id = $_REQUEST['group_id'];
        $select_id = $_REQUEST['select_id'];
        $type = $_REQUEST['type'];
        $table_name = "";
        $id = "";
        $type_name = "";

        if ($type == 1) {
            $table_name = 'group_114_zeinkali';
            $id = 'zeinkal_id';
            $type_name = "Zeinkal";
        }

        if ($type == 2) {
            $table_name = 'group_114_ostats';
            $id = 'ostat_id';
            $type_name = "Master";
        }

        if ($type == 4) {
            $table_name = 'group_114_damxmare';
            $id = 'damxmare_id';
            $type_name = "Helper";
        }

        parent::setQuery("UPDATE `$table_name` SET `status`='0' WHERE (`group_114_id`=$group_id AND `status`=1);");
        parent::execQuery();

        parent::setQuery("INSERT INTO `$table_name`
                                    (`group_114_id`,`$id`)
                            VALUES 
                                    ($group_id,$select_id);");
        parent::execQuery();

        return array("status" => "ok", "type" => $type_name);
    }
}
