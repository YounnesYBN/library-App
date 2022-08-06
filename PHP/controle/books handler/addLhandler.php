<?php
require "../../module/bookModule.php";
if(isset($_POST["add"])){
        $writer = $_POST["writer"];
        $title = $_POST["title"];
        $date = $_POST["date"];
        

        
                
        $book = new Book(0,$title,$writer,$date);
        
        $datebase = $book->Connect();
        if($datebase==false){
                echo json_encode(["sqlErr"=>true,"userErr"=>false]);
        }else{
                $existErrArray = $book->IsBookExist($datebase);
                if($existErrArray['titre&auteurERR']==true){
                        echo json_encode(["sqlErr"=>false,"userErr"=>true]);
                }else{
                        $book->Addbook($datebase);
                        echo json_encode(["sqlErr"=>false,"userErr"=>false]);
                }
        
        }
        
        
}

?>