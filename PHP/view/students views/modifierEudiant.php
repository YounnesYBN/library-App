
<?php 
session_start();
if(isset($_SESSION["editeLpass"])){
        if($_SESSION['editeLpass']==false){
                echo "you dont have access to this page ";
                exit();
        }
        
}else{
        echo "you dont have access to this page ";
        exit();
}
?>
<!DOCTYPE html>
<script src="../jquery.js"></script>
<html lang="en">
<head>
        <style>
                body{
                        width: 100%;
                        height: 600px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color:blueviolet;
                }
                #form{
                        width: 470px;
                        height: 500px;
                        background-color:blueviolet;
                        border-radius: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                }
                
                #form2{
                        gap: 5px;
                        width: 470px;
                        height: 500px;
                        background-color:blueviolet;
                        border-radius: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                }
                #form2 input{
                        width: 300px;
                        height: 30px;
                }
                #form2 #code{
                        width: 100px;
                        margin-left: 150px;
                }
                textarea{
                        width: 300px;
                }
                #form2 #add{
                        margin-top: 5px;
                        border-style: none;
                        border-radius: 50px;
                        width: 200px;
                        height: 30px;
                        
                        transition: 0.2s;
                }
                #form2 #add:hover{
                        color: white;
                        width: 200px;
                        height: 35px;
                        background-color:cadetblue;

                }
                #back{
                        text-align: center;
                        border-style: none;
                        text-decoration: none;
                        padding-top: 10px;
                        border-radius: 5px;
                        background-color: gray;
                        width: 150px;
                        height: 30px;
                        transition: 0.2s;
                        margin-bottom: 20px;
                
                }
                #back:hover{
                        background-color:red;
                        width: 200px;
                        border-radius: 100px 0px 0px 100px;
                        color:azure;
                }
                #modi{
                        border-style: none;
                        border-radius: 50px;
                        width: 70px;
                        height: 30px;
                        margin: 10px;
                        transition: 0.2s;
                }
                #modi:hover{
                        color: white;
                        width: 170px;
                        height: 35px;
                        background-color:cadetblue;

                }
                #code{
                        width: 50px;
                        height: 50px;
                        text-align: center;
                        border: 1px;
                        border-radius: 50px;
                }
        </style>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>modifier livre</title>
</head>
<body>
        
        <div id="form">
                <input type="text" name="idcheck" placeholder="code" id="code">
                <input type="button" name="check" value="modifier" id="modi"><br>
                <a  id="back" href="../index.php">go back</a>
                <div id="message"></div>
        </div>
        <div id='form2'>
                <div>code:   <br><input type='text' name='id' placeholder='code..' id='code2'></div>
                <div>nom:    <br><input type='text' name='nom' placeholder='nom de etudient...' id='nom'></div>
                <div>prenom: <br><input type='text' name='prenom' placeholder='prenom de etudient...' id='prenom'></div>
                <div>class:  <br><input type='text' name='class' placeholder='classe ...'id='class'></div>
                <div>adress: <br><textarea name='adress' id='adress' cols='30' rows='10'></textarea></div>
                <input type='button' name='modifi' value='saisir les modifications' id='add'>
        </div>
        
        <script>
                $("document").ready(function(){
                        $("#form2").hide()
                        $("#modi").click(function(){
                                var id = $("#code").val();
                                //to check if id existe
                                $.ajax({
                                        type:"GET",
                                        url:"../../controle/students handler/editeEhandler.php",
                                        data:{"checkID":'true',"id":id},
                                        dataType:"JSON",
                                        success:function(respond){
                                                if(respond.err==true){
                                                        $("#message").html(respond.message)
                                                        $("#form2").hide()

                                                }else{
                                                        $("#message").html(respond.message)
                                                        
                                                        var infoLIST = respond.info[0]
                                                        $("#code2").val(infoLIST.id)
                                                        console.log(infoLIST.id)
                                                        $("#nom").val(infoLIST.name)
                                                        $("#prenom").val(infoLIST.Fname)
                                                        $("#adress").val(infoLIST.adress)
                                                        $("#class").val(infoLIST.class)
                                                        $("#form2").show()
                                                }
                                        },
                                        beforeSend:function(){
                                                $("#message").html("<h3 style='color:yellow'>wait..</h3>")
                                        }
                                })

                        })



                        $("#add").click(function(){
                                //to update information of choosen
                                var id = $("#code2").val();
                                var nom = $("#nom").val();
                                var prenom = $("#prenom").val();
                                var classe = $("#class").val();
                                var adress = $("#adress").val();
                                
                                $.ajax({
                                type:"GET",
                                url:"../../controle/students handler/editeEhandler.php",
                                data:{"update":'true',"id":id,"nom":nom,"prenom":prenom,"class":classe,"adress":adress},
                                dataType:"JSON",
                                success:function(respond){
                                        if(respond.err==true){
                                                $("#message").html(respond.message)
                                        }else{
                                                $("#message").html(respond.message)
                                                $("#form2").hide()
                                        }
                                }
                                })
                        })
                })
        </script>
</body>
</html>