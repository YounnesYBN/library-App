<?php

require "../../module/bookModule.php";

if(isset($_GET["GetInfo"])){
        
        $book = new Book();
        $database = $book->Connect();
        if($database!=false){
                $allResult = $book->GetAllBooks($database);
                echo json_encode(["err"=>false,"info"=>$allResult]);
                
        }else{
                echo json_encode(["err"=>true]);
        }
        
}

?>