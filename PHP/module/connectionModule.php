<?php
        function chekingeInfo($email,$username,$password){
                $arrayERR = array("email"=>false,"username"=>false,"password"=>false);
                if(empty($email)==true){
                        $arrayERR["email"] = true;
                }else{
                        if(strpos($email,"@")==false &&(strpos($email,".com")==false||strpos($email,".net")==false||strpos($email,".fr")==false)){
                                $arrayERR["email"] = true;
                        }
                }
                if(empty($username)==true){
                        $arrayERR["username"] = true;
                }else{
                        $SpCara = ["^","£","$","%","&","*","(",")",'}','{',"@",'#','~','?','>','<','>',',','|','=','_','+','¬','-','"',"'","/","\\","."];
                        foreach($SpCara as $cara){
                                if(strpos($username,$cara)!==false){
                                        $arrayERR["username"] = true;
                        }
                        $test = preg_match("/[0-9]/",$username);
                        if($test==true){
                                $arrayERR["username"] = true;
                        }
                        }
                }
                if(empty($password)==true){
                        $arrayERR["password"] = true;
                }
                return $arrayERR;
        }

        function login($username,$password){
                $erro_list=array("userErr"=>false,"sqlErr"=>false);
                try{
                        $dsn = "mysql:host=localhost;dbname=registion;charset=utf8";
                        $name = "root";
                        $passW = "";
                        $mydatabase = new PDO($dsn,$name,$passW);
                        $mydatabase->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        $myquery2= $mydatabase->prepare("SELECT * FROM users WHERE username=? AND password=?;");
                        $myquery2->execute(array($username,$password));
                        if($result = $myquery2->fetch()){
                                
                        }else{
                                $erro_list["userErr"]=true;
                        }
                        
                }catch(PDOException $e){
                        $erro_list["sqlErr"]=true;
                        $erro_list["message"]=$e->getMessage();
                }
                return $erro_list;
        }
        
        function singup($username,$email,$password){
                $erro_list = array("sqlErr"=>false,"userErr"=>false);
                try{
                        $dsn = "mysql:host=localhost;dbname=registion;charset=utf8";
                        $name = "root";
                        $passW = "";
                        $mydatabase = new PDO($dsn,$name,$passW);
                        $mydatabase->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        $myquery1= $mydatabase->prepare("SELECT email FROM users WHERE email=?;");
                        $myquery1->execute(array($email));
                        if($result=$myquery1->fetch()){
                                $erro_list["userErr"] = true;
                                $myquery1->closeCursor();
        
                        }else{
                                $myquery2=$mydatabase->prepare("INSERT INTO users(username,email,password) VALUES(?,?,?);");
                                $myquery2->execute(array($username,$email,$password));
                                $myquery2->closeCursor();
                        }
        
        
                }catch(PDOEXCEPTION $e){
                        $erro_list["sqlErr"] = true;
                        $erro_list["message"] = $e;
                }
        
                return $erro_list;
        }
?> 