<?php
require "../../module/studentModule.php";
require "../../module/empruntModule.php";

if(isset($_POST["delete"])){
        $id = $_POST["id"];
        
        $emprunt = new Emprunt();
        $student = new Student($id);
        $database = $student->Connect();
                
        $emprunt->DeleteEmpruntByStudent($emprunt->Connect(),$id);
        $student->DeleteStudent($database);

                                                
}



?>