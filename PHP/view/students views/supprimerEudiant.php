<?php 
session_start();
if(isset($_SESSION["deletepass"])){
        if($_SESSION["deletepass"]==false){
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
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
                body{
                        background-color:blueviolet;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 600px;
                }
                #good{
                        color: green;
                }
                #message{
                        color:red;
                }
                #delete{
                        border-style: none;
                        border-radius: 50px;
                        width: 100px;
                        height: 30px;
                        transition: 0.2s;
                }
                #delete:hover{
                        width: 150px;
                        height: 40px;
                        background-color:blueviolet;


                }
                div#parent{
                        border: 1px ;
                        border-radius: 15px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        background-color:cadetblue;
                        width: 550px;
                        height: 550px;

                }
                #back{
                        text-decoration: none;
                        text-align: center;
                        padding-top: 6px;
                        border-style: none;
                        margin-left: 20px;
                        border-radius: 5px;
                        background-color: gray;
                        margin-top: 10px;
                        width: 200px;
                        height: 30px;
                        transition: 0.2s;
                
                }
                #back:hover{
                        background-color:red;
                        width: 300px;
                        border-radius: 100px 0px 0px 100px;
                        color:azure;
                }
                
                #code{
                        width: 60px;
                        height: 50px;
                        text-align: center;
                        border: 1px;
                        border-radius: 50px;
                }

        </style>
        <title>supprimer livre</title>
</head>
<body>
        <div id="parent">
                <p>CODE</p>
                <input type="text" name="code" placeholder="code.." id="code"><br><br><br>
                <input  id ="delete" type="button" name="delete" value="delete" id="delete">
                <a id=back href="../index.php" name="back" >go back</a>
        </div>
        <div id="message"></div>
        <script>
                $("document").ready(function(){
                        $("#delete").click(function(){
                                var id = $("#code").val();
                                $.ajax({
                                        type:"GET",
                                        url:"../../controle/students handler/deleteEhandler.php",
                                        data:{"delete":"true","id":id},
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
                