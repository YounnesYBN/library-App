<?php 
session_start();
if(isset($_SESSION["listLpass"])==false){
        echo"you dont have access to this page ";
        exit();
}else{
        if($_SESSION["listLpass"]==false){
                echo "you dont have access to this page";
                exit();
        }
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>student list</title>
        <script src="../jquery.js"></script>
        <style>
                h1{
                        padding: 10px;
                        border: 1px;
                        color:purple;
                        background-color: gray;
                        border-radius: 10px;
                }
                body{
                        background-color: black;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                }
                table{
                        background-color: gray;
                        border: 1px solid purple;
                        text-align: center;
                        width: 600px;
                        height: 100px;
                }
                table tr{
                        width: 60px;
                }
                table td{
                        border: 6px solid purple;
                }
                table th{
                        height: 20px;
                        background-color: purple;
                }
        </style>
</head>
<body>
        <h1>livre list</h1>
        <table>
                <thead>
                <tr>
                        <th>code</th>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Date</th>
                        
                </tr>
                </thead>
                <tbody>

                </tbody>
                
        </table>
        <script>
                $("document").ready(function(){
                        $.ajax({
                                type:"GET",
                                url:"../../controle/books handler/listLhandler.php",
                                data:{"list":"true"},
                                dataType:"html",
                                success: function(respond){
                                        $("tbody").html(respond);
                                }
                        })
                })
        </script>
</body>
</html>