<?php 
require "../../module/empruntModule.php";


if(isset($_POST["delete"])){

    $id  = $_POST["id"];

    $epmrunt = new Emprunt();
    $database = $epmrunt->Connect();
    $epmrunt->DeleteEmprunt($database,$id);
    


}


?>