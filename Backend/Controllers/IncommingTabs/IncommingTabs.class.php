<?php

header("Content-Type:multipart/form-data");

use Backend\Controllers\IncommingTabs\comments;
use Backend\Controllers\IncommingTabs\detail;
use Backend\Controllers\IncommingTabs\file;
use Backend\Controllers\IncommingTabs\history;
use Backend\Controllers\IncommingTabs\logs;
use Backend\Controllers\IncommingTabs\mail;
use Backend\Controllers\IncommingTabs\news;
use Backend\Controllers\IncommingTabs\question;
use Backend\Controllers\IncommingTabs\records;
use Backend\Controllers\IncommingTabs\sms;
use Backend\Controllers\IncommingTabs\task;
use Middleware\Routers\dbClass;

class IncommingTabs extends dbClass
{

    public $colCount;
    public $cols;

    public function getHistory()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        $startDate = rawurldecode($_REQUEST['stardDate']);
        $endDate = rawurldecode($_REQUEST['endDate']);
        $phone = $_REQUEST['phone'];
        $clientNum = $_REQUEST['clientNum'];

        return (new history())->GET($this->colCount, $this->cols, $startDate, $endDate, $phone, $clientNum);
    }

    public function getTask()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        return (new task())->GET($this->colCount, $this->cols);
    }

    public function getDetails()
    {
        $inc_id         = $_REQUEST['inc_id'];

        return (new detail())->GET($inc_id);
    }

    public function getQuestion()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        return (new question())->GET($this->colCount, $this->cols);
    }


    public function getSms()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $inc_id         = $_REQUEST['inc_id'];


        return (new sms())->GET($this->colCount, $this->cols, $inc_id);
    }

    public function insertSms()
    {
        $inc_id         = $_REQUEST['inc_id'];
        $text           = $_REQUEST['text'];
        $phones         = $_REQUEST['phones'];
        $ussdsmsResult     = $_REQUEST["ussdResult"];
        
        parent::setQuery("SELECT ussd_id, source_id FROM incomming_request WHERE id = $inc_id");
        $po = parent::getResultArray();

        if(COUNT($po["result"]) >= 1 && $ussdsmsResult != 0) {
            if($po["result"][0]["source_id"] == 12) {
                $id = $po["result"][0]["ussd_id"];
                
                parent::setQuery("UPDATE ussd SET SmsDt = NOW(), SmsText = $ussdsmsResult, SmsTextFull = '$text', LastUpdateDt = NOW() WHERE id = $id ");
                parent::execQuery();
            }

        }

        
        return (new sms())->INSERT($text, $inc_id, $phones);
    }


    public function getMail()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $inc_id         = $_REQUEST['inc_id'];
        return (new mail())->GET($this->colCount, $this->cols, $inc_id);
    }

    public function sendMail()
    {

        $inc_id = $_REQUEST['inc_id'];
        $email = $_REQUEST['email'];
        $cc = $_REQUEST['cc'];
        $bcc = $_REQUEST['bcc'];
        $subject = $_REQUEST['subject'];
        $text = $_REQUEST['text'];
        $attachments = $_REQUEST['attachment'];
        $send_record = $_REQUEST['send_record'];

        return (new mail())->INSERT($inc_id, $email, $cc, $bcc, $subject, $text, $attachments, $send_record);
    }



    public function getSignature()
    {

        parent::setQuery("SELECT id, name FROM mail_signature WHERE active = 1");

        $extResult = parent::getResultArray();

        return  $extResult['result'];
    }

    public function getShablon()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("SELECT id, 'text' as text,name FROM mail_signature WHERE active = 1");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getShablonMail()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("SELECT id, name,text FROM mail_template WHERE actived = 1");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getShablonSMS()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("SELECT id,name,text FROM sms_template WHERE actived = 1");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getCnobar()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        parent::setQuery("SELECT id, 'text' as text,name FROM mail_signature WHERE active = 1");

        $callList = parent::getKendoList($this->colCount, $this->cols);

        return $callList;
    }

    public function getFile()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $inc_id         = $_REQUEST['id'];

        return (new file())->GET($this->colCount, $this->cols, $inc_id);
    }

    public function addFile()
    {
        $files = [];
        $inc_id = $_REQUEST['inc_id'];
        $route = $_REQUEST['uploadedfrom'];

        foreach ($_FILES as $file) {
            array_push($files, $file);
        }

        return (new file())->ADD($files, $inc_id,$route);
    }

    public function getRecordsInc()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $phone     = $_REQUEST['phone'];

        return (new records())->GETInc($this->colCount, $this->cols, $phone);
    }

    public function getRecordsOut()
    {

        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $phone     = $_REQUEST['phone'];

        return (new records())->GETOut($this->colCount, $this->cols, $phone);
    }

    public function getComments()
    {
        $inc_id         = $_REQUEST['inc_id'];
        return (new comments())->GET($inc_id);
    }

    public function insertComments()
    {
        $inc_id         = $_REQUEST['inc_id'];
        $text         = $_REQUEST['text'];
        $parent_id         = $_REQUEST['parent_id'];
        return (new comments())->INSERT($text, $parent_id, $inc_id);
    }

    public function deleteComments()
    {
        $id         = $_REQUEST['id'];
        return (new comments())->DELETE($id);
    }

    public function editComments()
    {
        $id         = $_REQUEST['id'];
        $text         = $_REQUEST['text'];
        return (new comments())->UPDATE($id, $text);
    }

    public function getLogs()
    {
        $inc_id         = $_REQUEST['inc_id'];
        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];

        return (new logs())->GET($this->colCount, $this->cols, $inc_id);
    }

    public function getNews()
    {
        $status_id      = $_REQUEST['status_id'];;
        $this->colCount = $_REQUEST['count'];
        $this->cols     = $_REQUEST['cols'];
        $startDate = rawurldecode($_REQUEST['startDate']);
        $endDate = rawurldecode($_REQUEST['endDate']);

        return (new news())->GET($this->colCount, $this->cols, $status_id, $startDate, $endDate);
    }
}
