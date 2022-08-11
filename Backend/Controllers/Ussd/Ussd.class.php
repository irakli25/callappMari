<?php

use Middleware\Routers\dbClass;

class Ussd extends dbClass
{

    public function GetDialog()
    {
        $id = $_REQUEST["id"];
        $operator       = $_REQUEST['operator'];
        $startDate      = rawurldecode($_REQUEST['startDate']);
        $endDate        = rawurldecode($_REQUEST['endDate']);

        $sources_multi  = rawurldecode($_REQUEST['sources']);
        $allstatus_multi  = rawurldecode($_REQUEST['allstatus']);

        $filter = "";
        $filter = " AND incomming_request.datetime BETWEEN '$startDate' AND '$endDate' ";

        parent::setQuery("  SELECT  ussd.id AS ussd_id,
                                    ussd.datetime,
                                    ussd.user_id,
                                    ussd.abonent_phone,
                                    ussd.abonent_name,
                                    ussd.abonent_address,
                                    ussd.abonent_number,
                                    ussd.abonent_status,
                                    ussd.abonent_coment,
                                    ussd.call_date,
                                    ussd.call_unix_time,
                                    ussd.call_phone,
                                    ussd.category_parent_id,
                                    ussd.category_id,
                                    ussd.sub_category,
                                    ussd.call_problem_date,
                                    ussd.call_status_id,
                                    ussd.call_object_id,
                                    ussd.call_source_id,
                                    ussd.call_content_ussd,
                                    ussd.undone,
                                    ussd.uniqueid,
                                    ussd.call_status,
                                    ussd.asterisk_incomming_id,
                                    ussd.call_content1,
                                    ussd.call_content2,
                                    ussd.update,
                                    ussd.tr,
                                    ussd.category_114_id,
                                    ussd.cal_type_114_id,
                                    ussd.sub_category_114_id,
                                    ussd.region_id,
                                    ussd.contact_person_surname_114,
                                    ussd.contact_person_phone_114,
                                    ussd.contact_person_address,
                                    ussd.comment_114_ussd,
                                    ussd.transfer,
                                    ussd.phoneNumber,
                                    ussd.AccidentTypeId,
                                    ussd.Rd,
                                    ussd.Comment,
                                    ussd.CustomerNumber,
                                    ussd.CustomerFullName,
                                    ussd.CaseRegId,
                                    ussd.GnercId,
                                    ussd.StatusId,
                                    ussd.DeadLine,
                                    ussd.DistrictName,
                                    ussd.CustomerAddress,
                                    ussd.CustomerFullNumber,
                                    ussd.CompensationDeadLine,
                                    ussd.CompensationAmount,
                                    ussd.commentFullNumber,
                                    ussd.commentNumber,
                                    ussd.NeedCompensation,
                                    ussd.LastUpdateDt,
                                    ussd.CompensationDocUrl,
                                    ussd.CompensationTransId,
                                    ussd.ExtraDocUrl,
                                    ussd.ReagirebaDoc,
                                    ussd.ActualDt,
                                    ussd.SmsDt,
                                    ussd.SmsText,
                                    ussd.ResultId,
                                    ussd.process_status_id,
                                    ussd.incomming_id,
                                    ussd.reaction,
                                    ussd.view,
                                    ussd.ussd_process_status_id,
                                    ussd.SmsTextFull
                            FROM incomming_request
                            JOIN ussd ON ussd.id = incomming_request.ussd_id
                            WHERE incomming_request.id = $id
                            ");
        return parent::getResultArray()["result"][0];
    }

    public function Save()
    {
        $id = $_REQUEST["id"];

        parent::setQuery("  UPDATE  ussd SET 
                                    AccidentTypeId = '$_REQUEST[AccidentTypeId]',
                                    CaseRegId = '$_REQUEST[CaseRegId]',
                                    GnercId = '$_REQUEST[GnercId]',
                                    StatusId = '$_REQUEST[StatusId]',
                                    ResultId = '$_REQUEST[ResultId]',
                                    DeadLine = '$_REQUEST[DeadLine]',
                                    DistrictName = '$_REQUEST[DistrictName]',
                                    CompensationAmount = '$_REQUEST[CompensationAmount]',
                                    ActualDt = '$_REQUEST[ActualDt]',
                                    CompensationTransId = '$_REQUEST[CompensationTransId]',
                                    NeedCompensation = '$_REQUEST[NeedCompensation]',
                                    CompensationDeadLine = '$_REQUEST[CompensationDeadLine]',
                                    LastUpdateDt = NOW()
                                    
                            WHERE ussd.id = $id
                            ");
        return parent::execQuery();
    }

    public function GetTypes()
    {
        parent::setQuery("  SELECT  id,
                                    name
                            FROM  ussd_types
                            WHERE actived = 1");

        return parent::getResultArray()['result'];
    }

    public function GetStatus()
    {
        parent::setQuery("  SELECT  id,
                                    name
                            FROM  ussd_status
                            WHERE actived = 1");

        return parent::getResultArray()['result'];
    }

    public function GetResult()
    {
        parent::setQuery("  SELECT  id,
                                    name
                            FROM  ussd_result
                            WHERE actived = 1");

        return parent::getResultArray()['result'];
    }

    public function GetSmsTypes()
    {
        parent::setQuery("  SELECT  id,
                                    name
                            FROM  sms_template
                            WHERE id IN(75,76) AND actived = 1");

        return parent::getResultArray()['result'];
    }

    public function SetSmsFullText()
    {
        $text = $_REQUEST["text"];
        $ussd_id = $_REQUEST["ussd_id"];

        parent::setQuery("UPDATE `incomming_ussd` SET ussd = '$text' , SmsDt = now() WHERE id = $ussd_id ;");
        return parent::execQuery();
    }

    public function changeUserId()
    {
        $id = $_REQUEST["id"];

        parent::setQuery("SELECT ussd_id AS id  FROM incomming_request WHERE id = $id ;");
        $ussdid = parent::getResultArray()["result"][0]["id"];

        parent::setQuery("UPDATE ussd SET user_id = '$_SESSION[USERID]' WHERE id = $ussdid ;");
        parent::execQuery();
    }

    public function GetSmsTemplate()
    {
        $id = $_REQUEST["id"];
        $inc_id = $_REQUEST["inc_id"];

        parent::setQuery("SELECT ussd_id FROM incomming_request WHERE id = $inc_id ; ");
        $match = parent::getResultArray()['result'];

        if(COUNT($match) < 1) 
            return ['error'=>'მომართვა არ არის ussd კომუნიკაცია'];

        $ussd_id = $match[0]["ussd_id"];

        parent::setQuery("SELECT * FROM ussd WHERE id = $ussd_id ; ");
        $fill = parent::getResultArray()['result'][0];

        parent::setQuery("  SELECT  text
                            FROM  sms_template
                            WHERE id IN($id) ; ");

        return [
            'text' => parent::getResultArray()['result'][0]["text"],
            'fill' => $fill,
            'error' => ''
        ];
    }

    public function UploadFile()
    {
        $data = [];
        $files = [];
        $error = "";

        foreach ($_FILES as $file) array_push($files, $file);
        $foldername = date("Y-m-d");

        if (!file_exists('Frontend/Uploads/ussd/' . $foldername . '')) 
            mkdir('Frontend/Uploads/ussd/' . $foldername . '', 0777, true);
        
        $allowFileExt = array('pdf');
        $uploadTo = "Frontend/Uploads/ussd/" . $foldername . "/";

        foreach ($files as $file) {
            $imageName = $file['name'];
            $tempPath = $file['tmp_name'];

            $original_name = $imageName;
            $hashed_name = md5_file($tempPath) . date('y_m_d-hms-') . $_SESSION["USERID"];
            $type = end((explode(".", $imageName)));

            $new = $hashed_name . "." . $type;
            $pathto = $uploadTo . $new;
            $imageExt = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));

            if (empty($imageName)) {
                $error = "Please Select files..";
                return $error;
            } else {
                if (in_array($imageExt, $allowFileExt)) { 

                    if(move_uploaded_file($tempPath, $pathto)) {
                        array_push($data, array(
                            "location"  => $uploadTo,
                            "hashed"    => $hashed_name,
                            "original"  => $original_name,
                            "full_name" => $new,
                            "type"      => $type,
                            "link"      =>  $uploadTo . $new,
                            "success"   => true
                        ));

                        $field = $_REQUEST["which"];
                        $id = $_REQUEST["id"];

                        parent::setQuery("UPDATE ussd SET $field = '" . $uploadTo . $new . "' WHERE id = $id; ");
                        parent::execQuery();

                    } else {
                        $error = "ვერ აიტვირთა";
                        
                        array_push($data, array(
                            "location"  => $uploadTo,
                            "hashed"    => $hashed_name,
                            "original"  => $original_name,
                            "full_name" => $new,
                            "type"      => $type,
                            "link"      =>  $uploadTo . $new,
                            "success"   => false
                        ));
                    }
                } else {
                    $error = "არასწორი ფორმატის ფაილი";
                    
                    array_push($data, array(
                        "location"  => $uploadTo,
                        "hashed"    => $hashed_name,
                        "original"  => $original_name,
                        "full_name" => $new,
                        "type"      => $type,
                        "link"      =>  $uploadTo . $new,
                        "success"   => false
                    ));
                }

            }

        }

        return ['data'=>$data, 'error'=>$error];

    }

    public function ChangeToTaken()
    {
        $userID = $_SESSION["USERID"];
        $id = $_REQUEST["id"];

        parent::setQuery("UPDATE ussd SET taken_user_id = $userID, taken_datetime = now() WHERE id = $id;");
        return parent::execQuery();
    }

}
