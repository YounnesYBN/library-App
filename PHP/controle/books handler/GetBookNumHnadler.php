<?php 

require "../../module/bookModule.php";

if(isset($_GET["GetNum"])){
    $book = new Book();
    $database = $book->Connect();
    if($database!=false){
        $number = $book->GetBookNumber($database)["number"];
        echo json_encode(["err"=>false,"number"=>$number]);
    }else{
        echo json_encode(["err"=>true]);
    }
}


?>