<?php
session_start();
require "../../module/bookModule.php";

// request of checking id
if(isset($_GET["checkID"])){
        $id = $_GET["id"];
        $_SESSION["oldID"] = $id;
        if(empty($id)){
                echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>please enter the information </h3>"));
        }else{
                if(is_numeric($id)){
                        $book = new Book($id);
                        $database = $book->Connect();
                        if($database != false){
                                $exit = $book->IsBookExist($database)["idERR"];
                                if($exit==true){
                                        $info = $book->SearchBook($database,"id");
                                        $_SESSION["oldAuteur"]=$info[0]["auteur"];
                                        $_SESSION["oldTitre"]=$info[0]["Titre"];
                                        echo json_encode(array("err"=>false,"message"=>"<h3 style='color:green'>book is exist!</h3>","info"=>$info));
                                }else{
                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>there is no book with id ".$id."</h3>"));
                                }
                        }else{
                                echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>somthing went wrong </h3>"));
                        }
                }else{
                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>id should be a number</h3>"));
                }
        }
}
elseif(isset($_GET["update"])){
        $id=$_GET["id"];
        $titre=$_GET["titre"];
        $auteur=$_GET["auteur"];
        $date=$_GET["date"];
        $oldID = $_SESSION["oldID"];
        $oldAuteur = $_SESSION["oldAuteur"];
        $oldTitre = $_SESSION["oldTitre"];
        if(empty($id)==false&&empty($titre)==false&&empty($auteur)==false&&empty($date)==false){
                if(is_numeric($id)==false){
                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>id should be integer </h3>"));
                }else{
                        
                        $oldbook = new Book($oldID);
                        $book2 = new Book($id,$titre,$auteur,$date);
                        $database =$book2->Connect();
                        if($database != false){
                                $checkInfo = $book2->CheckBookInfo();
                                $checkInfoArray = $book2->IsBookExist($database);
                                if($checkInfo["auteur"]==true){
                                        if($oldID == $id){
                                                if($checkInfoArray["titre&auteurERR"]!=false){
                                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>this titre and auteur is already taken</h3>"));
                                                }else{
                                                        $oldbook->UpdateBook($database,$id,$titre,$auteur,$date);
                                                        echo json_encode(array("err"=>false,"message"=>"<h3 style='color:green'>book with id ".$oldID." is update successfully</h3>"));
                                                }

                                        }elseif($oldAuteur==$auteur&&$oldTitre==$titre){

                                                if($checkInfoArray["idERR"]!=false){
                                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>this id is already taken</h3>"));
                                                }else{
                                                        $oldbook->UpdateBook($database,$id,$titre,$auteur,$date);
                                                        echo json_encode(array("err"=>false,"message"=>"<h3 style='color:green'>book with id ".$oldID." is update successfully</h3>"));
                                                }
                                                
                                        }else{
                                                
                                                $checkInfoArray = $book2->IsBookExist($database);
                                                if($checkInfoArray["idERR"]!=false){
                                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>this id is already taken</h3>"));
                                                }elseif($checkInfoArray["titre&auteurERR"]!=false){
                                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>this auteur and titre are already taken </h3>"));
                                                }else{
                                                        $book->UpdateBook($database,$id,$titre,$auteur,$date);
                                                        echo json_encode(array("err"=>false,"message"=>"<h3 style='color:green'>book with id".$oldID." is update successfully</h3>"));
                                        }
                                        }
                                }else{
                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>auteur should be string </h3>"));

                                }
                        }else{
                                echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>somthing went wrong </h3>"));
                        }
                }
        }else{
                echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>enter all information </h3>"));
        }
}else{
        echo "nop";
}

?>