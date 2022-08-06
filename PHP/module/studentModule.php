<?php 
        class Student{
                private int $id;
                private string $nom;
                private string $prenom;
                private string $class;
                private string $adress;
                
                public function __construct(int $id=0,string $nom="",string $prenom="",string $class="",string $adress=""){
                        $this->id=$id;
                        $this->nom = $nom;
                        $this->prenom = $prenom;
                        $this->class = $class;
                        $this->adress = $adress;
                }

                //return the database
                public function Connect(){
                        try{
                                $dsn = "mysql:host=localhost;dbname=registion;charset=utf8";
                                $name = "root";
                                $passW = "";
                                $mydatabase = new PDO($dsn,$name,$passW);
                                $mydatabase->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                                return $mydatabase;
                        }catch(PDOException $e){
                                return false;
                        }
                }

                public function GetStudentNumber($database){
                        $query = $database->query("SELECT COUNT(*) AS 'number' FROM students");
                        return $query->fetch();
                }
                
                //add just students
                public function AddStudent($database){

                        $qury =$database->prepare("INSERT INTO students(nom,prenom,adresse,class) VALUES(?,?,?,?)");
                        $qury->execute(array($this->nom,$this->prenom,$this->adress,$this->class));
                        $qury->closeCursor();
                        
                        
                
                }


                //return an array of two type of erro 1:if if was taken 2: if name and Fname is taken
                public function IsStudentExist($database){
                        $error=array("name&FnameERR"=>false);
                        
                        $qury2 = $database->prepare("SELECT * FROM students WHERE nom=? AND prenom=? AND id !=? ;");
                        $qury2->execute(array($this->nom,$this->prenom,$this->id));
                        if($values2=$qury2->fetch()){
                                $error["name&FnameERR"]=true;
                        }
                        
                        return $error;
                }

                

                //just update depending on the id of object
                public function  UpdateStudent($database){
                        $query= $database->prepare("UPDATE students SET nom=?,prenom=?,adresse=?,class=? WHERE id=?");
                        $query->execute(array($this->nom,$this->prenom,$this->adress,$this->class,$this->id));
                        $query->closeCursor();
                        
                }

                //return an a normal array data contine key=>value arrays.
                public function GetAllStudent($database){
                        $allStudent = array();
                        $query = $database->query("SELECT * FROM students;");
                        while($result = $query->fetch()){
                                $allStudent[] = ["id"=>$result["id"],"name"=>$result["nom"],"family_name"=>$result['prenom'],"adress"=>$result['adresse'],"class"=>$result["class"],"loading"=>false];
                        }
                        $query->closeCursor();
                        return $allStudent;
                }

                //deletes a students depending on id if the object it self.
                public function DeleteStudent($database){
                        $query = $database->prepare("DELETE FROM students WHERE id =? ;");
                        $query->execute(array($this->id));
                        $query->closeCursor();
                        
                }
        
                //return an a normal array that contine key=>value arrays. depending on type of search
                public function SearchStudent($database,$serchtype){
                        $searchResult = array();
                        if($serchtype=="id"){
                                $query= $database->prepare("SELECT * FROM students WHERE id=?;");
                                $query->execute(array($this->id));
                                while($result=$query->fetch()){
                                        $searchResult[]=["id"=>$result["id"],"name"=>$result["nom"],"Fname"=>$result['prenom'],"adress"=>$result['adresse'],"class"=>$result["class"]];
                                }
                        }elseif($serchtype=="nom"){
                                $query= $database->prepare("SELECT * FROM students WHERE nom=?;");
                                $query->execute(array($this->nom));
                                while($result=$query->fetch()){
                                        $searchResult[]=["id"=>$result["id"],"name"=>$result["nom"],"Fname"=>$result['prenom'],"adress"=>$result['adresse'],"class"=>$result["class"]];
                                }
                        }elseif($serchtype=="prenom"){
                                $query= $database->prepare("SELECT * FROM students WHERE prenom=?;");
                                $query->execute(array($this->prenom));
                                while($result=$query->fetch()){
                                        $searchResult[]=["id"=>$result["id"],"name"=>$result["nom"],"Fname"=>$result['prenom'],"adress"=>$result['adresse'],"class"=>$result["class"]];
                                }
                        }elseif($serchtype=="class"){
                                $query= $database->prepare("SELECT * FROM students WHERE class=?;");
                                $query->execute(array($this->class));
                                while($result=$query->fetch()){
                                        $searchResult[]=["id"=>$result["id"],"name"=>$result["nom"],"Fname"=>$result['prenom'],"adress"=>$result['adresse'],"class"=>$result["class"]];
                                }
                        }elseif($serchtype=="adresse"){
                                $query= $database->prepare("SELECT * FROM students WHERE adresse=?;");
                                $query->execute(array($this->adress));
                                while($result=$query->fetch()){
                                        $searchResult[]=["id"=>$result["id"],"name"=>$result["nom"],"Fname"=>$result['prenom'],"adress"=>$result['adresse'],"class"=>$result["class"]];
                                }
                        }
                        return $searchResult;
                }
                public function ConvertInfo($arrays){
                        $message ="";
                        foreach($arrays as $result){
                                $message.= "<tr><td>".$result["id"]."</td><td>".$result["name"]."</td><td>".$result["Fname"]."</td><td>".$result["adress"]."</td><td>".$result["class"]."</td></tr>";
                        }
                        return $message;
                }
                public function Convert_to_option($arrays){
                        $message = "";
                        foreach($arrays as $result){
                                $message .= "<option value='".$result["id"]."'>".$result["name"]." ".$result["Fname"]."</option>";
                        }
                        return $message;
                }
}
?>