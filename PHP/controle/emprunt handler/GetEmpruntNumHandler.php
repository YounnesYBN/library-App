<?php 

require "../../module/empruntModule.php";

if(isset($_GET["GetNum"])){
    $emprunt = new Emprunt();
    $database = $emprunt->Connect();
    if($database!=false){
        $number = $emprunt->GetEmpruntNum($database)["number"];
        echo json_encode(["err"=>false,"number"=>$number]);
    }else{
        echo json_encode(["err"=>true]);
    }
}


?>