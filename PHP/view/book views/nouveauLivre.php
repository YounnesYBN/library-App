<?php 
session_start();
if(isset($_SESSION["addLpass"])){
        if($_SESSION["addLpass"]==true){
        }else{
        echo "you dont have access to this page";
        exit();
        }
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
                        width: 70px;
                        height: 30px;
                        
                        transition: 0.2s;
                }
                #form1 #add:hover{
                        color: white;
                        width: 200px;
                        height: 35px;
                        background-color:cadetblue;

                }
                
                #back{
                        text-align: center;
                        background-color: whitesmoke;
                        text-decoration: none;
                        border-style: none;
                        border-radius: 5px;
                        padding-top: 5px;
                        margin-top: 10px;
                        width: 100px;
                        height: 25px;
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
                <div>code:   <br><input type="text" name="id" placeholder="code.." id="id"></div>
                <div>Tite:    <br><input type="text" name="titre" placeholder="titre de livre..." id="titre"></div>
                <div>auteur: <br><input type="text" name="auteur" placeholder="nom de auteur .."id="auteur"></div>
                <div>date:  <br><input type="date" name="date" id="date"></div>
                <input type="button" name="add" value="ajouter" id="add"><br><br><br>
                <a id='back' href="../index.php">main page</a>
        </div>
        <div id="message"></div>
        <script>
                $("document").ready(function(){
                        $("#add").click(function(){
                                var id = $("#id").val();
                                var titre = $("#titre").val();
                                var auteur = $("#auteur").val();
                                var date = $("#date").val();
                                $.ajax({
                                        type:"GET",
                                        url:"../../controle/books handler/addLhandler.php",
                                        data:{"add":"true","id":id,"titre":titre,"auteur":auteur,"date":date},
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