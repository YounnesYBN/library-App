
<?php 

require "../../module/empruntModule.php";

if(isset($_GET["check"])){

    $emprunt = new Emprunt();
    $connection = $emprunt->Connect();
    if($connection==false){
        echo json_encode(["connect"=>false]);
    }else{
        echo json_encode(["connect"=>true]);
    }


}else{
    echo "shiiiish";
}



?>