<?php
require "../../module/studentModule.php";
if(isset($_POST["add"])){
        $nom = $_POST["name"];
        $prenom = $_POST["Fname"];
        $classe = $_POST["class"];
        $adress = $_POST["adress"];

        
                
        $student = new Student(0,$nom,$prenom,$classe,$adress);
        
        $datebase = $student->Connect();
        if($datebase==false){
                echo json_encode(["sqlErr"=>true,"userErr"=>false]);
        }else{
                $existErrArray = $student->IsStudentExist($datebase);
                if($existErrArray['name&FnameERR']==true){
                        echo json_encode(["sqlErr"=>false,"userErr"=>true]);
                }else{
                        $student->AddStudent($datebase);
                        echo json_encode(["sqlErr"=>false,"userErr"=>false]);
                }
        
        }
        
        
}

?>