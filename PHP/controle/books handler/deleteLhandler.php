<?php
require "../../module/bookModule.php";

require "../../module/empruntModule.php";

if(isset($_POST["delete"])){
        $id = $_POST["id"];
        
        $emprunt = new Emprunt();
        $student = new Book($id);
        $database = $student->Connect();
                
        $emprunt->DeleteEmpruntByBook($emprunt->Connect(),$id);
        $student->DeleteBook($database);

                                                
}

?>