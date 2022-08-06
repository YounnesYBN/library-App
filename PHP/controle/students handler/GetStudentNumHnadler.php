<?php 

require "../../module/studentModule.php";

if(isset($_GET["GetNum"])){
    $student = new Student();
    $database = $student->Connect();
    if($database!=false){
        $number = $student->GetStudentNumber($database)["number"];
        echo json_encode(["err"=>false,"number"=>$number]);
    }else{
        echo json_encode(["err"=>true]);
    }
}


?>