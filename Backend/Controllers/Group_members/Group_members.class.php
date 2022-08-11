<?php

use Middleware\Routers\dbClass;

class Group_members extends dbClass
{
    public function getList()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("  SELECT 	group_members.id,
                                    group_members.`name`,
                                    group_members_types.name,
                                    group_members.`phone`
                            FROM 	  group_members
                            LEFT JOIN group_members_types ON group_members.type_id = group_members_types.id
                            WHERE 	  group_members.actived=1
                            ORDER BY group_members.id DESC");
        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getTypes()
    {
        parent::setQuery("SELECT id,name 
                         FROM `group_members_types`");
        return parent::getResultArray()['result'];
    }

    public function getById()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("SELECT 	group_members.id,
                                    group_members.`name` as `name_surname`,
                                    group_members.type_id as `type`,
                                    group_members.`phone` as `phone`
                            FROM 	  group_members
                            WHERE 	  group_members.id = $id");
        $result = parent::getResultArray()['result'][0];

        if (empty($result['id'])) {
            $result = array('id' => 0);
        }

        return $result;
    }

    public function INSERT()
    {
        $name_surname = $_REQUEST['name_surname'];
        $type_id = $_REQUEST['type_id'];
        $phone = $_REQUEST['phone'];

        parent::setQuery("INSERT INTO group_members(`name`,`type_id`,`phone`)
                                        VALUES('$name_surname','$type_id','$phone')");

        parent::execQuery();

        return array("status" => "ok");
    }

    public function UPDATE()
    {
        $name_surname = $_REQUEST['name_surname'];
        $type_id = $_REQUEST['type_id'];
        $phone = $_REQUEST['phone'];
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE group_members
                            SET `name` = '$name_surname',
                                `type_id` = '$type_id',
                                `phone` = '$phone'
                            WHERE id = '$id'");

        parent::execQuery();

        return array("status" => "ok");
    }

    public function DELETE()
    {
        $id = $_REQUEST['id'];

        parent::setQuery("UPDATE group_members
                            SET `actived` = '0'
                            WHERE id = '$id'");

        parent::execQuery();

        return array("status" => "ok");
    }
}
