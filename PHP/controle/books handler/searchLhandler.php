<?php 
require "../../module/bookModule.php";

if(isset($_GET["search"])){
        $option=$_GET["option"];
        $value=$_GET["value"];

        if(empty($value)==false){
                $admin = new Book();
                $database = $admin->Connect();
                if($database==false){
                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>somthing went wrong</h3>"));
                }else{
                        if($option=="id"){
                                if(is_numeric($value)==true){
                                        $book = new Book($value,"","","");
                                        $resultOfSearch = $book->SearchBook($database,$option);
                                        $finalResult = $book->ConvertInfo($resultOfSearch);
                                        echo json_encode(array("err"=>false,"message"=>$finalResult));
                                
                                }else{
                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>id should be a number</h3>"));
                                }

                        }elseif($option=="auteur"){
                                $book = new Book(0,"",$value,"");

                                $checkingAuteur = $book->CheckBookInfo();
                                if($checkingAuteur["auteur"]==true){
                                        $resultOfSearch =$book->SearchBook($database,$option);
                                        $finalResult = $book->ConvertInfo($resultOfSearch);
                                        echo json_encode(array("err"=>false,"message"=>$finalResult));
                                }else{
                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>auteur should be string </h3>"));
                                }
                        
                        }elseif($option=="titre"){
                                $book = new Book(0,$value,"","");
                                $resultOfSearch =$book->SearchBook($database,$option);
                                $finalResult = $book->ConvertInfo($resultOfSearch);
                                echo json_encode(array("err"=>false,"message"=>$finalResult));
                        }elseif($option=="date"){
                                $book = new Book(0,"","",$value);
                                $resultOfSearch =$book->SearchBook($database,$option);
                                $finalResult = $book->ConvertInfo($resultOfSearch);
                                echo json_encode(array("err"=>false,"message"=>$finalResult));
                        }
                }
        }else{
                echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>please enter the information </h3>"));
        }
}

?>