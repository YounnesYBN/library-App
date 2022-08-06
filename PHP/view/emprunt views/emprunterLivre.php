<?php
session_start(); 
if(isset($_SESSION["emprunterLivre_pass"])){
        if($_SESSION["emprunterLivre_pass"]==false){
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
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;     
                        background-color: white;
                }
                select{
                        border-radius: 3px;
                        background-color: plum;
                        text-align: center;
                        width: 150px;
                        height: 55px;
                }
                input#date{
                        border-radius: 50px;
                        border-style: none;
                        text-align: center;
                        background-color:blanchedalmond;
                        width: 150px;
                        height: 55px;
                }
                h2{
                        text-shadow: 1px 1px 2px gray;
                }
                #add{
                        box-shadow: 0px 0px 5px black;
                        border-radius: 5px;
                        color:white;
                        font-size: 18px;
                        margin-top:20px ;
                        width: 130px;
                        height: 40px;
                        background-color:green;
                        text-shadow: 1px 1px 5px black;
                        border-style:none;
                        transition: 0.2s;
                }
                #add:hover{
                        height: 45px;
                        width: 135px;
                        background-color: purple;
                }

                

        </style>
        <meta charset="UTF-8">
        <script src="../jquery.js"></script>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>emprunter Livre</title>
</head>
<body>
        <div id="parent">
                <div id="student-select-con">
                        <h2>Etudiant</h2>
                        <select name="" id="select-student"></select>
                </div>
                <div id="book-select-con">
                        <h2>Livre</h2>
                        <select name="" id="select-book"></select>
                </div>
                <div id="book-select-con">
                        <h2>date</h2>
                        <input type="date" name="" id="date">
                </div>

                <button id="add">
                        Emprunter
                </button>
                <div id="message">
        </div>

        </div>
        <script>
                $("document").ready(function(){
                        $.ajax({
                                type : "GET",
                                url  :  "../../controle/emprunt handler/display_student&book_handler.php",
                                data : {"getOptions":"true"},
                                dataType : "JSON",
                                success : function(respond){
                                        if(respond.err == true){
                                                $("#select-student").html("<option>error</option>")
                                                $("#select-book").html("<option>error</option>")
                                                $("#message").html(respond.message)
                                        }else{
                                                console.log(respond)
                                                $("#select-student").html(respond.student)
                                                $("#select-book").html(respond.book)
                                                $("#message").html("")

                                        }
                                },
                                beforeSend: function () { 
                                        $("#message").html("<h3 style='color:yellow'>wait..</h3>")
                                }
                        })
                        $("#add").click(function(){
                                var studentID = $("#select-student").val();
                                var bookID = $("#select-book").val()
                                var date = $("#date").val()
                                $.ajax({
                                        type:"GET",
                                        url:"../../controle/emprunt handler/empruntLivre_action.php",
                                        data:{"add":"true","studentID":studentID,"bookID":bookID,"date":date},
                                        dataType:"HTML",
                                        success : function(respond){
                                                $("#message").html(respond)
                                        },
                                        beforeSend : function(){
                                                $("#message").html("<h3 style='color:yellow'>wait..</h3>")
                                        }
                                })
                        })
                })
        </script>
</body>
</html>