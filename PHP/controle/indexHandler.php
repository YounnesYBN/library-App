<?php 
session_start();
if(isset($_GET["getPass"])){
        if(isset($_SESSION["indexPass"])){

                if($_SESSION["indexPass"]===true){
                        echo json_encode(["pass"=>true]);
                }else{
                        echo json_encode(["pass"=>false]);
                }
        }else{
                print_r($_SESSION);  
                echo json_encode(["pass"=>false]);
        }
}


?>





