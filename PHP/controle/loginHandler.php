<?php
session_start();
header("Access-Control-Allow-Origin");
require "../module/connectionModule.php";

if(isset($_GET["login"])){
        $_SESSION["userName"]="";
        $username = $_GET["username"];
        $password = $_GET["password"];

        $loginarray = login($username,$password);
        if($loginarray["sqlErr"]==true){
                echo json_encode(["errors"=>["sqlErr"=>true,"userErr"=>false],"message"=>"somting went wrong"]);
                
        }else{
                if($loginarray["userErr"]==true){
                        echo json_encode(["errors"=>["sqlErr"=>false,"userErr"=>true],"message"=>"this account do not existe"]);
                }else{
                        $_SESSION["indexPass"] = true;
                        $_SESSION["userName"] = $username;
                        echo json_encode(["errors"=>["sqlErr"=>false,"userErr"=>false],"message"=>"you loged in successfully","username"=>$username]);
                        
                }
        }
}else{
        echo "nop";
}

?>