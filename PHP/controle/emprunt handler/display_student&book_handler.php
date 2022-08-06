<?php 
require "../../module/bookModule.php";
require "../../module/studentModule.php";

if(isset($_GET["getOptions"])){
        $book = new Book();
        $student = new Student();

        $database = $book->Connect();
        if($database!=false){
                $allStudentOptions = $student->Convert_to_option($student->GetAllStudent($database));
                $allBookOptions = $book->Convert_to_option($book->GetAllBooks($database));
                echo json_encode(array("err"=>false,"student"=>$allStudentOptions,"book"=>$allBookOptions));

        }else{
                echo json_encode(array("err"=>true,"message"=>"<h3 style='color:red'>somthing went wrong</h3>"));
        }
}


?>