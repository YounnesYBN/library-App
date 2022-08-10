<?php 
class Emprunt{
        private string $name;
        private string $Fname;
        private string $title;
        private string $writer;
        private string $date;

        public function __construct(string $name="",string $Fname="",string $title="",string $writer="",string $date="")
        {       
                $this->name = $name;
                $this->Fname = $Fname;
                $this->title = $title;
                $this->writer = $writer;
                $this->date = $date;
        }

        public function Connect()
        {
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
        public function GetEmpruntNum($database){
                $query = $database->query("SELECT COUNT(*) AS 'number' FROM emprunts");
                return $query->fetch();
        }
        public function AddEmprunt($database){
                $qury =$database->prepare("INSERT INTO emprunts(name,Fname,title,writer,date) VALUES(?,?,?,?,?);");
                $qury->execute(array($this->name,$this->Fname,$this->title,$this->writer,$this->date));
                $qury->closeCursor();
        }

        public function IsEmpruntExist($database){
                $qury =$database->prepare("SELECT * FROM emprunts WHERE name=? AND Fname=? AND title=? AND writer=? ;");
                $qury->execute(array($this->name,$this->Fname,$this->title,$this->writer));
                if($qury->fetch()){
                        return true;
                }else{
                        return false;
                }
        }
        

        public function GetAllEmprunt($database){
                $array = [];
                $qeury  = $database->query("SELECT * FROM emprunts;");
                while($result=$qeury->fetch()){
                        $array[] = ["id"=>$result["id"],"name"=>$result["name"],"family_name"=>$result["Fname"],"title"=>$result["title"],"writer"=>$result["writer"],"date"=>$result["date"]];
                }
                return $array;
        }

        public function ConvertInfo($array){
                $message = "";
                foreach ($array as $result) {
                        $message .= "<tr><td>".$result["name"]."</td><td>".$result["family_name"]."</td><td>".$result["titre"]."</td><td>".$result["writer"]."</td><td>".$result["date"]."</td></tr>";
                }
                return $message;
        }

        public function DeleteEmpruntByStudent($database,$id){

                $query = $database->exec("DELETE from emprunts WHERE name = (SELECT nom from students WHERE id=".$id.") AND Fname = (SELECT prenom from students WHERE id=".$id.");");
                
                

        }

        public function DeleteEmpruntByBook($database,$id){

                $query = $database->exec("DELETE from emprunts WHERE title = (SELECT Titre from livre WHERE id=".$id.") AND writer = (SELECT auteur from livre WHERE id=".$id.");");
                
                
        }

        public function updateEmpruntByStudent($database,$oldName,$oldFname){

                $qeury = $database->prepare("UPDATE emprunts SET name=?,Fname=? WHERE name=? and Fname=?");
                $qeury->execute([$this->name,$this->Fname,$oldName,$oldFname]);
                $qeury->closeCursor();
        }
        public function updateEmpruntByBook($database,$oldWriter,$oldTitle){

                $qeury = $database->prepare("UPDATE emprunts SET writer=?,title=? WHERE writer=? and title=?");
                $qeury->execute([$this->writer,$this->title,$oldWriter,$oldTitle]);
                $qeury->closeCursor();
        }
}


?>