<?php 
require "../../module/studentModule.php";
if(isset($_GET["GetInfo"])){
        
        $student = new Student();
        $database = $student->Connect();
        if($database!=false){
                $allResult = $student->GetAllStudent($database);
                echo json_encode(["err"=>false,"info"=>$allResult]);
                
        }else{
                echo json_encode(["err"=>true]);
        }
        
}

?>