import { Component } from "react";
import BarOfApp from "./AppBar";
import FirstContent from "./AppFirstContent";
import AddStudent from "./AddStudent";
import DeleteStudent from "./DeleteStudent";
import EditeStudent from "./EditeStudent";
import AddBook from "./AddBook"; 
import EditeBook from "./EditeBook";
import DeleteBook from "./DeleteBook";
import BorrowOption from "./BorrowOption";


export default class AppContent extends Component{

    constructor(props){
        super(props)

        this.state={
            direction : "home"
        }
    }

    AddBorrowHandler(){
        this.setState({
            
            direction : "AddBor"
            
        })
    }

    AddStudentHandler(){
        this.setState({
            
            direction : "AddS"
            
        })
    }

    AddBookHandler(){
        this.setState({
            
            direction : "AddB"
            
        })
    }

    DeleteStudentHandler(){
        this.setState({
            
            direction : "DeleteS"
            
        })
    }
    EditeStudentHandler(){
        this.setState({
            
            direction : "EditeS"
            
        })
    }
    DeleteBookHandler(){
        this.setState({
            
            direction : "DeleteB"
            
        })
    }
    EditeBookHandler(){
        this.setState({
            
            direction : "EditeB"
            
        })
    }
    Home(){
        this.setState({
            
            direction : "home"
            
        })
    }

    render(){
       const directionArray = {home:<FirstContent key={"home"} />,AddS:<AddStudent key={"addStudent"} />,DeleteS:<DeleteStudent key={"deleteStudent"} />,EditeS:<EditeStudent key={"editeStudent"}/>,AddB : <AddBook key={"addBook"}/> ,DeleteB:<DeleteBook  key={"deleteBook"}/>,EditeB:<EditeBook  key={"editeBook"}/>,AddBor:<BorrowOption />}
        return( 
            <div id="app">
                <BarOfApp key={"barOfApp"} StudentOption={{add:this.AddStudentHandler.bind(this),delete:this.DeleteStudentHandler.bind(this),edite:this.EditeStudentHandler.bind(this)}} BackHome={this.Home.bind(this)} Name={this.props.Name} LogOutHandler={this.props.logOut}  BookOption={{add:this.AddBookHandler.bind(this),edite:this.EditeBookHandler.bind(this),delete:this.DeleteBookHandler.bind(this)} } BorrowOption={{add:this.AddBorrowHandler.bind(this)}} />
                
                {
                    Object.keys(directionArray).map((key)=>{
                        if(this.state.direction == key){
                            return directionArray[key]
                        }
                    })
                }
                
            </div>
        )
    }
}