<?php
session_start();
require "../../module/studentModule.php";
require "../../module/empruntModule.php";


if(isset($_POST["edite"])){
        $id=$_POST["id"];
        $name=$_POST["name"];
        $Fname=$_POST["Fname"];
        $class=$_POST["class"];
        $adress= $_POST["adress"];
        $oldName = $_POST["oldName"];
        $oldFname = $_POST["oldFname"];

        $student = new Student($id,$name,$Fname,$class,$adress);
        $emprunt = new Emprunt($name,$Fname);
        $database = $student->Connect();
        
        if($student->IsStudentExist($database)["name&FnameERR"]==false){
                $emprunt->updateEmpruntByStudent($emprunt->Connect(),$oldName,$oldFname);
                $student->UpdateStudent($database);
                echo json_encode(["userErr"=>false]);

        }else{
                echo json_encode(["userErr"=>true]);
        }
        

}

?>