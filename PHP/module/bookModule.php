<?php 
class Book{
        private int $id;
        private string $titre;
        private string $auteur;
        private string $date;

        public function __construct(int $id=0,string $titre="",string $auteur="",string $date=""){
                $this->id=$id;
                $this->titre=$titre;
                $this->auteur=$auteur;
                $this->date=$date;
        }
        
        //return the database
        public function Connect(){
                $dns = "mysql:host=localhost;dbname=registion;charset=utf8";
                $username = "root";
                $password = "";
                try{
                        $connection = new PDO($dns,$username,$password);
                        $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        return $connection;
                }catch(PDOException $e){
                        return false;
                }
        }

        public function GetBookNumber($database){
                $query = $database->query("SELECT COUNT(*) AS 'number' FROM livre");
                return $query->fetch();
        }
        //add just students
        public function Addbook($database){
                $qury =$database->prepare("INSERT INTO livre(Titre,auteur,date) VALUES(?,?,?)");
                $qury->execute(array($this->titre,$this->auteur,$this->date));
                $qury->closeCursor();
                
                
        
        }
        public function IsBookExist($database){
                $error=array("titre&auteurERR"=>false);
                $qury2 = $database->prepare("SELECT * FROM livre WHERE Titre=? AND auteur=?;");
                $qury2->execute(array($this->titre,$this->auteur));
                if($qury2->fetch()){
                        $error["titre&auteurERR"]=true;
                }
                        
                
                return $error;
        }
        //return an array of three type of erro 1:id if its not num 2:if auteur  have a number on it or a spicial caracter
        public function CheckBookInfo(){
                $errors = array("id"=>true,"auteur"=>true);
                $SpCara = ["^","£","$","%","&","*","(",")",'}','{',"@",'#','~','?','>','<','>',',','|','=','_','+','¬','-','"',"'","/","\\","."];
                
                if(is_numeric($this->id)==false){
                        $errorLIST["id"]=false;
                }

                foreach($SpCara as $cara){
                        if(strpos($this->auteur,$cara)!==false){
                                $errors["auteur"] = false;
                        }
                }
                $test = preg_match("/[0-9]/", $this->auteur);
                if($test==true){
                        $errors["auteur"] = false;
                }
                return $errors;
        }
        //just update depending on the id of object
        public function  UpdateBook($database,$newId,$newTitre,$newAuteur,$newDate){
                $query= $database->prepare("UPDATE livre SET id=?,Titre=?,auteur=?,date=? WHERE id=?");
                $query->execute(array($newId,$newTitre,$newAuteur,$newDate,$this->id));
                $query->closeCursor();
                
        }
        //return an a normal array that contine key=>value arrays.
        public function GetAllBooks($database){
                $allStudent = array();
                $query = $database->query("SELECT * FROM livre;");
                while($result = $query->fetch()){
                        $allStudent[] = ["id"=>$result["id"],"title"=>$result["Titre"],"writer"=>$result['auteur'],"date"=>$result['date'],"loading"=>false];
                }
                $query->closeCursor();
                return $allStudent;
        }
        //deletes a book depending on id if the object it self.
        public function DeleteBook($database){
                $query = $database->prepare("DELETE FROM livre WHERE id =? ;");
                $query->execute(array($this->id));
                $query->closeCursor();
                
        }
        //return an a normal array that contine key=>value arrays. depending on type of search
        public function SearchBook($database,$serchtype){
                $searchResult = array();
                if($serchtype=="id"){
                        $query= $database->prepare("SELECT * FROM livre WHERE id=?;");
                        $query->execute(array($this->id));
                        while($result=$query->fetch()){
                                $searchResult[]=["id"=>$result["id"],"Titre"=>$result["Titre"],"auteur"=>$result["auteur"],"date"=>$result["date"]];
                        }
                }elseif($serchtype=="titre"){
                        $query= $database->prepare("SELECT * FROM livre WHERE Titre=?;");
                        $query->execute(array($this->titre));
                        while($result=$query->fetch()){
                                $searchResult[]=["id"=>$result["id"],"Titre"=>$result["Titre"],"auteur"=>$result["auteur"],"date"=>$result["date"]];
                        }
                }elseif($serchtype=="auteur"){
                        $query= $database->prepare("SELECT * FROM livre WHERE auteur=?;");
                        $query->execute(array($this->auteur));
                        while($result=$query->fetch()){
                                $searchResult[]=["id"=>$result["id"],"Titre"=>$result["Titre"],"auteur"=>$result["auteur"],"date"=>$result["date"]];
                        }
                }elseif($serchtype=="date"){
                        $query= $database->prepare("SELECT * FROM livre WHERE date=?;");
                        $query->execute(array($this->date));
                        while($result=$query->fetch()){
                                $searchResult[]=["id"=>$result["id"],"Titre"=>$result["Titre"],"auteur"=>$result["auteur"],"date"=>$result["date"]];
                        }
                }
                return $searchResult;
        }
        public function ConvertInfo($arrays){
                $message ="";
                foreach($arrays as $result){
                        $message .= "<tr><td>".$result["id"]."</td><td>".$result["Titre"]."</td><td>".$result["auteur"]."</td><td>".$result["date"]."</td></tr>";
                }
                return $message;
        }
        public function Convert_to_option($arrays){
                $message = "";
                foreach($arrays as $result){
                        $message .= "<option value='".$result["id"]."'>".$result["Titre"]."</option>";
                }
                return $message;
        }

        

}
?>