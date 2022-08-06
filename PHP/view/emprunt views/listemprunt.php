<?php
session_start();
if(isset($_SESSION['list_emprunt_pass'])){
        if($_SESSION['list_emprunt_pass']==false){
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
        <style>
                body{
                        height: 600px;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color:cornsilk;

                }
                #parent{
                        width: 50%;
                        border: 1px solid;
                        height: 90%;
                        background-color: white;
                }
                table{
                        background-color:black;
                        border: 1px solid purple;
                        text-align: center;
                        width: 100%;
                }
                table tr{
                        width: 60px;
                }
                table td{
                        color:aliceblue;
                        border: 6px solid purple;
                }
                table th{
                        height: 50px;
                        background-color: purple;
                }
        </style>
        <script src="../jquery.js"></script>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>list emprunt</title>
</head>
<body>
        <div id="parent">
                <table>
                        <thead>
                                <tr>
                                        <th>nom</th>
                                        <th>prenom</th>
                                        <th>titre</th>
                                        <th>auteur</th>
                                        <th>date</th>
                                </tr>
                        </thead>
                        <tbody>

                        </tbody>
                </table>
                <div id="#message">

                </div>
        </div>
        <script>
                $("document").ready(function(){
                        $.ajax({
                                type : "GET",
                                url  :  "../../controle/emprunt handler/listEmprunt_Handler.php",
                                data : {"getAllEmprunt":"true"},
                                dataType : "JSON",
                                success : function(respond){
                                        if(respond.err == true){
                                                $("#message").html(respond.message)
                                        }else{
                                                $("tbody").html(respond.message)
                                        }
                                },
                                beforeSend: function () { 
                                        $("#message").html("<h3 style='color:yellow'>wait..</h3>")
                                }
                        })
                })
        </script>
</body>
</html>