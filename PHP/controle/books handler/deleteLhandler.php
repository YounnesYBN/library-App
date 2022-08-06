<?php
require "../../module/bookModule.php";
require "../../module/empruntModule.php";
if(isset($_GET["delete"])){
        $id = $_GET["id"];
        if(empty($id)==false){
                        if(is_numeric($id)==true){
                        $emprunt = new Emprunt();
                        $book = new Book($id);
                        $checkIdArray = $book->CheckBookInfo();
                        if($checkIdArray["id"]==false){
                                echo "<h3 style='color:red;'>ID must be intiger</h3>";
                        }else{
                                $database = $book->Connect();
                                if($database !=false){
                                        $isExist = $book->IsBookExist($database);
                                        if($isExist["idERR"]==true){
                                                $emprunt->DeleteEmpruntByBook($emprunt->Connect(),$id);
                                                $book->DeleteBook($database);
                                                echo "<h3 style='color:green;'>the book with id '".$id."' just got deleted successfully</h3>";
                                        }else{
                                                echo "<h3 style='color:red;'>this id is not existe</h3>";
                                        }
                                }else{
                                        echo "<h3 style='color:red;'>somthing went wrong</h3>";
                                }
                        }
                        
                }else{
                echo "<h3 style='color:red;'>id should be number</h3>";
                }
        
        }else{
                echo "<h3 style='color:red;'>pleas enter an ID</h3>";
        }
}

?>