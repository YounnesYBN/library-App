import React,{Component} from "react";
import Welcom from "./welcom";
import Question from "./question";
import Login from "./login";
import Singin from "./Singin";
import AppContent from "./AppContent";




export default class Main extends Component{

    constructor(props){
        super(props)
        
        this.state = {
            showQuestion : true,
            haveAcco : null,
            allowAccess :this.IfstillInPass(),
            username  : this.IfstillInName(),
        }
        
        
        
        
        this.IfHaveAcco = this.IfHaveAcco.bind(this);
        this.IfNotHaveAcco = this.IfNotHaveAcco.bind(this);
        this.IfClose = this.IfClose.bind(this);

    }

    getAccess(){
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        this.setState({
            allowAccess : user.pass,
            username : user.name
        })
    }

    

    IfHaveAcco(){
        this.setState({
            showQuestion : false,
            haveAcco : true,
        })
    }

    IfNotHaveAcco(){
        this.setState({
            showQuestion : false,
            haveAcco : false,
        })
    }

    IfClose(){
        this.setState({
            showQuestion : true,
            haveAcco : null,
        })
    }

    // in case was already loged in this function return the pass from localstorage and it used inside stroucter in state | so if was already login the function will return true insted false
    IfstillInPass(){
        if(localStorage.length==0){
            return false
        }else{
            const user = localStorage.getItem("user")
            if(user==null){
                return false
            }else{
               var userOBJ = JSON.parse(user)
                return userOBJ.pass
            }

        }
    }
    // in case was already loged in this function return the name from localstorage and it used inside stroucter in state | so if was already login the function will return name insted null
    IfstillInName(){
        if(localStorage.length==0){
            return null
        }else{
            const user = localStorage.getItem("user")
            if(user==null){
                return null
            }else{
               var userOBJ = JSON.parse(user)
                return userOBJ.name
            }

        }
    }
    logout(){
        
            localStorage.clear()
            this.setState({
                allowAccess:false,
                username : null
            })
        
    }

    render(){
        
        
        if(this.state.allowAccess===true){
            
            return (
                <div>
                        <AppContent Name={this.state.username} logOut={this.logout.bind(this)}/>
                </div>
                )
            
        }else{
            
            return(

                <div className="main" id="center-ele"style={{height:600}}>

                    <div id="center-ele" style={{width:"50%",height:"100%"}}>
                            <Welcom  />
                    </div>
                    <div id="center-ele" style={{width:"50%",height:"100%"}}>
                            {this.state.showQuestion===true ? <Question No={this.IfNotHaveAcco} Yes={this.IfHaveAcco} /> : this.state.haveAcco===true ? <Login CloseLogin={this.IfClose} getAccess={this.getAccess.bind(this)} /> : <Singin CloseSingup ={this.IfClose}  getAccess={this.getAccess.bind(this)} /> }
                    </div>

                </div>

            )
        }
    }

}