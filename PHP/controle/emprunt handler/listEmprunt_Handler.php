<?php 
require "./../../module/empruntModule.php";
if(isset($_GET["GetInfo"])){
        
        $emprunt = new Emprunt();
        $database = $emprunt->Connect();
        if($database!=false){
                $allResult = $emprunt->GetAllEmprunt($database);
                echo json_encode(["err"=>false,"info"=>$allResult]);
                
        }else{
                echo json_encode(["err"=>true]);
        }
        
}    


?>