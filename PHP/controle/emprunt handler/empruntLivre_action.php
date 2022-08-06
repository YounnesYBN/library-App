<?php
require "../../module/empruntModule.php";
if(isset($_GET["add"])){
        if(empty($_GET["date"])){
                echo "<h3 style='color:red'>pleas enter all information</h3>";
        }else{
                $idbook = $_GET["bookID"];
                $idstudent = $_GET["studentID"];
                $date = $_GET["date"];
                $emprunt = new Emprunt($idbook,$idstudent,$date);
                $database = $emprunt->Connect();
                if($database != false){
                        $isExist = $emprunt->IsempruntExist($database);
                        if($isExist==false){
                                $emprunt->AddEmprunt($database);
                                echo "<h3 style='color:green'>the emprunt is added</h3>";
                        }else{
                                echo "<h3 style='color:red'>this Emprunt is already exist</h3>";
                        }
                }else{
                        echo "<h3 style='color:red'>somthing went wrong</h3>";
                }
        }
}

?>