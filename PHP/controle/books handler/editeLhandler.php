<?php

require "../../module/bookModule.php";
require "../../module/empruntModule.php";


if(isset($_POST["edite"])){
        $id=$_POST["id"];
        $writer=$_POST["writer"];
        $title=$_POST["title"];
        $date=$_POST["date"];
        $oldWriter = $_POST["oldWriter"];
        $oldTitle = $_POST["oldTitle"];

        $book = new Book($id,$title,$writer,$date);
        $emprunt = new Emprunt("","",$title,$writer);
        $database = $book->Connect();
        
        if($book->IsBookExist($database)["titre&auteurERR"]==false){
                $emprunt->updateEmpruntByBook($emprunt->Connect(),$oldWriter,$oldTitle);
                $book->UpdateBook($database);
                echo json_encode(["userErr"=>false]);

        }else{
                echo json_encode(["userErr"=>true]);
        }
        

}

?>