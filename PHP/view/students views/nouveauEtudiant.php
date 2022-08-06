<?php
session_start();
if(isset($_SESSION["addpass"])){
        if($_SESSION["addpass"]==false){
                echo "you dont have access to this page";
                exit();
        }
}else{
        echo "you dont have access to this page";
        exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
        <script src="../jquery.js"></script>
        <style>
                body{
                /* background-color: black;    */
                        width: 100%;
                        height: 800px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background-color: blueviolet;
                }
                
                #form1{
                        width: 600px;
                        height: 500px;
                        background-color:blueviolet;
                        border-radius: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                }
                #form1 input{
                        width: 300px;
                        height: 30px;
                }
                
                #form1 #add{
                        border-style: none;
                        border-radius: 50px;
                        width: 100px;
                        height: 50px;
                        transition: 0.2s;
                }
                #form1 #add:hover{
                        color: white;
                        width: 200px;
                        height: 50px;
                        background-color:cadetblue;

                }
                
                #back{
                        text-align: center;
                        background-color: whitesmoke;
                        text-decoration: none;
                        border-style: none;
                        border-radius: 5px;
                        padding-top: 9px;
                        margin-top: 15px;
                        width: 100px;
                        height: 40px;
                        transition: 0.2s;
                
                }
                #back:hover{
                        background-color:red;
                        width: 200px;
                        border-radius: 100px 0px 0px 100px;
                        color:azure;
                }
        </style>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
</head>
<body>
        <div id="form1">
                <div>code:   <br><input type="text" name="id" placeholder="code.." id="code"></div>
                <div>nom:    <br><input type="text" name="nom" placeholder="nom de etudient..." id="nom"></div>
                <div>prenom: <br><input type="text" name="prenom" placeholder="prenom de etudient..."id="prenom"></div>
                <div>class:  <br><input type="text" name="class" placeholder="classe ..."id="class"></div>
                <div>adress:    <br><textarea name="adress" id="adress" cols="40" rows="10"></textarea></div>
                <button id="add">add</button><br>
                <a id='back' href="../index.php">main page</a>
        </div>
        <div id="message"></div>
        <script>
                $("document").ready(function(){
                        $("#add").click(function(){
                                var id = $("#code").val();
                                var nom = $("#nom").val();
                                var prenom = $("#prenom").val();
                                var classe = $("#class").val();
                                var adress = $("#adress").val();
                                $.ajax({
                                        type:"GET",
                                        url:"../../controle/students handler/addEhandler.php",
                                        data:{"add":"true","id":id,"nom":nom,"prenom":prenom,"classe":classe,"adress":adress},
                                        dataType:"HTML",
                                        success:function(respond){
                                                $("#message").html(respond);
                                        },
                                        beforeSend:function(){
                                                $("#message").html("<h3 style='color:yellow'>white..</h3>");
                                        }
                                })
                        })
                })
        </script>
</body>
</html>