<?php
session_start();
if(isset($_SESSION["sercheLpass"])){
        if($_SESSION['sercheLpass']==true){
                $message="";
                
                
                
                
                
        }else{
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
        <title>Document</title>
        <style>
                body{
                        background-color: blueviolet;
                        width: 100%;
                        height: 600px;
                        display: flex;
                        align-items: center;
                        justify-content: center;        
                }
                #parent{
                        background-color: blueviolet;
                        width:25%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap:30px;
                }
                #value{
                        border-style: none;
                        width: 200px;
                        height: 30px;
                }
                *{
                        text-align: center;
                }

                #table-con{
                        width: 50%;
                        height: 100%;
                        background-color: gray;
                        border-radius: 15px;
                }
                table{
                        background-color: gray;
                        border: 1px solid purple;
                        text-align: center;
                        width: 100%;
                }
                table caption{
                        margin-top: 0px;
                        color:white;
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
                .input{
                        border-style: none;
                        width: 60px;
                        height: 30px;
                        border:1px;
                        border-radius: 50px; 
                }
                #back{
                        padding-top: 8px;
                        text-decoration: none;
                        border-style: none;
                        border-radius: 5px;
                        background-color: lightslategray;
                        margin-top: 10px;
                        width: 100px;
                        height: 30px;
                        transition: 0.2s;
                
                }
                #back:hover{
                        background-color:red;
                        width: 200px;
                        border-radius: 100px 0px 0px 100px;
                        color:azure;
                }
                #enter{

                        border-style: none;
                        border-radius: 50px;
                        width: 70px;
                        height: 30px;
                        
                        transition: 0.2s;
                }
                
                #enter:hover{
                        color: white;
                        width: 200px;
                        height: 35px;
                        background-color:cadetblue;

                }
                #value{

                        border: 1px;
                        border-radius: 50px;
                }
                #select{
                        width: 100px;
                        height: 30px;
                        border:1px;
                        background-color:cadetblue ;

                }
                
                
        </style>
</head>
<body>
        <div id="parent">
                <select name="select" id="select">
                        <option value="id" name="id">code</option>
                        <option value="titre" name="titre">titre</option>
                        <option value="auteur" name="auteur">auteur</option>
                        <option value="date" name="date">date</option>
                        
                </select>
                <input type="text" name="value"  id="value">
                <input type="button" value="enter" name="enter" calss="input" id="enter">
                <a href='../index.php' id="back">go back</a>
                <div id="message"></div>
                
        </div>
        <div id="table-con">
                        <table>
                                <caption><h1>result</h1></caption>
                                <thead>
                                <tr><th>code</th><th>Titre</th><th>auteur</th><th>date</th></tr>"
                                </thead>
                                <tbody>

                                </tbody>
                        </table>
        </div>
        
<script >
        $("document").ready(function(){

                $("#select").change(function(e){
                        var option = e.target.value 
                        if(option=="date"){
                                $("#value").attr("type","date");
                        }else{
                                $("#value").attr("type","text");
                        }
                })
                $("#enter").click(function(){
                        console.log("click")
                        var value = $("#value").val();
                        var option = $("select").val();
                        $.ajax({
                                type:"GET",
                                url:"../../controle/books handler/searchLhandler.php",
                                data:{"search":"true","value":value,"option":option},
                                dataType:"JSON",
                                success:function(respond){
                                        if(respond.err==true){
                                                $("#message").html(respond.message);
                                        }else{
                                                if(respond.message.length==0){
                                                        $("caption h1").text("no result")
                                                        $("caption h1").css("color","orange")
                                                        $("tbody").html(respond.message)
                                                        $("#message").html("");

                                                }else{
                                                        $("caption h1").text("results")
                                                        $("caption h1").css("color","white")
                                                        $("tbody").html(respond.message)
                                                        $("#message").html("<h3 style='color:green;'>search is over</h3>");
                                                }}
                                },
                                beforeSend:function(){
                                        $("#message").html("<h3 style='color:yellow;'>wait...</h3>")
                                }})
                })
        })
</script> 
</body>
</html>
