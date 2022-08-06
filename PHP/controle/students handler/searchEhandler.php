<?php 
require "../../module/studentModule.php";

if(isset($_GET["search"])){
        $option=$_GET["option"];
        $value=$_GET["value"];

        if(empty($value)==false){
                $admin = new Student();
                $database = $admin->Connect();
                if($database==false){
                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>somthing went wrong</h3>"));
                }else{
                        if($option=="id"){
                                if(is_numeric($value)==true){
                                        $student = new Student($value,"","","","");
                                        $resultOfSearch = $student->SearchStudent($database,$option);
                                        $finalResult = $student->ConvertInfo($resultOfSearch);
                                        echo json_encode(array("err"=>false,"message"=>$finalResult));
                                
                                }else{
                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>id should be a number</h3>"));
                                }

                        }elseif($option=="nom"){
                                $student = new student(0,$value,"","","");

                                $checkingNom = $student->CheckStudentInfo();
                                if($checkingNom["name"]==true){
                                        $resultOfSearch =$student->SearchStudent($database,$option);
                                        $finalResult = $student->ConvertInfo($resultOfSearch);
                                        echo json_encode(array("err"=>false,"message"=>$finalResult));
                                }else{
                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>nom should be string </h3>"));
                                }
                        
                        }elseif($option=="prenom"){
                                $student = new student(0,"",$value,"","");

                                $checkingNom = $student->CheckStudentInfo();
                                if($checkingNom["Fname"]==true){
                                        $resultOfSearch =$student->SearchStudent($database,$option);
                                        $finalResult = $student->ConvertInfo($resultOfSearch);
                                        echo json_encode(array("err"=>false,"message"=>$finalResult));
                                }else{
                                        echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>prenom should be string </h3>"));
                                }
                        }elseif($option=="class"){
                                $student = new Student(0,"","",$value,"");
                                $resultOfSearch =$student->SearchStudent($database,$option);
                                $finalResult = $student->ConvertInfo($resultOfSearch);
                                echo json_encode(array("err"=>false,"message"=>$finalResult));
                        }else{
                                $student = new Student(0,"","","",$value);
                                $resultOfSearch =$student->SearchStudent($database,$option);
                                $finalResult = $student->ConvertInfo($resultOfSearch);
                                echo json_encode(array("err"=>false,"message"=>$finalResult));
                        }
                }
        }else{
                echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>please enter the information </h3>"));
        }
}

?>