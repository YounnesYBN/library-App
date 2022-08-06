<?php

session_start();

if($_SESSION["login_pass"]==false){
        header("Location: login.html");
        exit();
}else{  
        $_SESSION["addpass"]=true;
        $_SESSION["listpass"]=true;
        $_SESSION["serchepass"]=true;
        $_SESSION["editepass"]=true;
        $_SESSION["deletepass"]=true;
        $_SESSION["addLpass"]=true;
        $_SESSION["listLpass"]=true;
        $_SESSION["deleteLpass"]=true;
        $_SESSION["sercheLpass"] = true;
        $_SESSION["editeLpass"]=true;
        $_SESSION["emprunterLivre_pass"]=true;
        $_SESSION['list_emprunt_pass']=true;
        
}
        


?>
<!DOCTYPE html>
<html lang="en">
<head>
        <script src="./jquery.js"></script>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>main page</title>
        <style>
                body{
                        width: 100%;
                        height: 600px;
                        background-color: black;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        
                }
                #parent1{
                        width: 1000px;
                        height: 100px;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        background-color: blueviolet;
                }
                #parent1 a{
                        background-color: whitesmoke;
                        text-align: center;
                        padding-top: 10px;
                        width: 160px;
                        border-radius: 5px;
                        text-decoration: none;
                        border-style: none;
                        transition: 0.5s;
                }
                #parent1 a:hover{
                        border-radius: 50px;
                        width: 150px;
                        height: 35px;
                        color:whitesmoke;
                        background-color: red;
                }
                #form2{
                        margin-top: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 2px;
                        background-color:rgb(100, 67, 142);
                        width: 500px;
                        height: 500px;
                        box-shadow: 0px 0px 10px rgb(255, 254, 254);
                        
                
                }
                #form2 h3,a{
                        text-align: center;
                        width: 200px;
                        height: 30px;
                }
                #form2 a{
                        text-decoration: none;
                        background-color:gray;
                        color: white;
                        border-style: none;
                        transition: 0.5s;
                }
                #form2 a:hover{
                        
                        background-color: black;
                        color: blueviolet;
                }
                #form2 h3{
                        margin: 0;
                        color:white;
                        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                        background-color: blueviolet;
                        border: 1px solid;
                        
                        border-style: none;
                }
        </style>
</head>
<body>
        
                <div id="parent1">
                        <h2>TP PHP PDO</h2>
                        <h1 id="username">welcome</h1>
                        
                        <a id="exit" href="./login.html">exit</a>
                        
                </div>
                <div id='form2'>
                                <h3>gestion livre</h3>
                                <a href="book views/nouveauLivre.php">nouveau livre</a>
                                <a href="book views/supprimerLivre.php">suppression livre</a>
                                <a href="book views/modifierLivre.php">modification livre</a>
                                <a href="book views/recherhLivre.php">rechreche livre</a>
                                <a href="book views/listeLivres.php">list livre</a>
                                <h3>gestion etudiant </h3>
                                <a href="students views/nouveauEtudiant.php">nouveau etudiant</a>
                                <a href="students views/supprimerEudiant.php">suppression etudiant</a>
                                <a href="students views/modifierEudiant.php">modification etudiant</a>
                                <a href="students views/recherheEtud.php">rechreche etudiant</a>
                                <a href="students views/listeEtudiants.php">list etudiant</a>
                                <h3>gestion Emprunt</h3>
                                <a href="./emprunt views/emprunterLivre.php">emprunt livre</a>
                                <a href="./emprunt views/listemprunt.php">emprunt list</a>
                                
        </div>
        
        <script>
                $("document").ready(function(){
                        $.post("../controle/indexHandler.php",{"getname":"true"},function(respons){
                                $("#username").text($("#username").text()+" "+respons);
                        })
                        $("#exit").click(function(e){
                                
                                $.post("../controle/indexHandler.php",{"exit":"true"})
                        })

                
                })
        </script>
</body>
</html>