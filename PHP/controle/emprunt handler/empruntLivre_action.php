<?php
require "../../module/empruntModule.php";

if(isset($_POST["AddBorrow"])){
        $name = $_POST["name"];
        $Fname = $_POST["Fname"];
        $title = $_POST["title"];
        $writer = $_POST["writer"];
        $date = $_POST["date"];

        $emprunt = new Emprunt($name,$Fname,$title,$writer,$date);
        $database = $emprunt->Connect();
        $isExist = $emprunt->IsEmpruntExist($database);
        if($isExist==true){
                echo json_encode(["userErr"=>true]);
        }else{
                $emprunt->AddEmprunt($database);
                echo json_encode(["userErr"=>false]);
                
        }
        
}

?>