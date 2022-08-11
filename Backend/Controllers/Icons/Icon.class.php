<?php

namespace Controllers\IncommingTabs;

use Middleware\Routers\dbClass;

class Icon extends dbClass
{
    public function UploadIcon()
    {
        $file = $_REQUEST["file"];
        $checker = 1;
        $target_dir = "uploads/icons/";
        $target_file = $target_dir . basename($file);
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));


        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $checker = 0;
        }

        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $checker = 0;
        }

        if ($checker == 0) {
            echo "Sorry, your file was not uploaded.";
        } 
        else {
            if (move_uploaded_file($file, $target_file)) {
                echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
            } 
            else {
                echo "Sorry, there was an error uploading your file.";
            }
        }


    }
}
