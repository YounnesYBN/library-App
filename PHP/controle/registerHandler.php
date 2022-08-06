<?php 
session_start();
header("Access-Control-Allow-Origin");

require "../module/connectionModule.php";
if(isset($_POST["singin"])){
        if($_POST["singin"]==true){
                $email = $_POST["email"];
                $username = $_POST["username"];
                $password = $_POST["password"];
                
                $singuparray = singup($username,$email,$password);
                if($singuparray["sqlErr"]==true){
                        echo json_encode(["errors"=>["sqlErr"=>true,"userErr"=>false],"message"=>"somting went wrong"]);
                
                }elseif($singuparray["userErr"]==true){
                        echo json_encode(["errors"=>["sqlErr"=>false,"userErr"=>true],"message"=>"this account is already existe"]);
                }else{
                        $_SESSION["userName"] = $username;
                        
                        echo json_encode(["errors"=>["sqlErr"=>false,"userErr"=>false],"message"=>"you singed up successfuly","username"=>$username]);
                }
                        
                
        }
}else{
        echo "nop";
}
?>