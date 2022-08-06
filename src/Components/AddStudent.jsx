import { Component } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Alert, Snackbar, IconButton } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Close } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress} from "@material-ui/core";
import $ from "jquery";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

function Loading(){
    return <CircularProgress color="secondary" size={80} />
}

function OnSuccess(props){
    return <Alert severity="success" sx={{width:"fit-content",fontSize:"large"}} >the student <em style={{color:"lightBlue",padding:"0px 5px 0px 5px"}}> {props.Name} </em> is added successfully</Alert>
}

function OnError(props){
    return <Alert severity="error" sx={{width:"fit-content",fontSize:"large"}}><em> {props.Message} </em></Alert>
}

function AlertErr(){
  
    return <Alert severity="error" >please fill the information correctly</Alert>
}
function AlertSucc(props){
    return <Alert severity="success" sx={{width:"fit-content",fontSize:"large"}}>{props.type} is correct.</Alert>
}

export default class AddStudent extends Component{

    constructor(props){
        super(props)

        this.state = {

            student : {error:{name:null,Fname:null,class:null,adress:null},info:{name:"",Fname:"",class:"",adress:""}},
            ErrMessage : false,
            backDrop : {active:false,loding:false,success:null,name:"",message:""}
            
        }
        
    }

    OnChangeName(e){
        const {student} = this.state
        var value = e.target.value
        var rex = /^[a-zA-Z]{1,}$/.test(value)
        this.setState({
            student : {error:{name:rex===true?false:true,Fname:student.error.Fname,class:student.error.class,adress:student.error.adress},info:{name:rex===true?value:"",Fname:student.info.Fname,class:student.info.class,adress:student.info.adress}}
        })

    }

    OnChangeFname(e){
        const {student} = this.state
        var value = e.target.value
        var rex = /^[a-zA-Z]{1,}$/.test(value)
        this.setState({
            student : {error:{name:student.error.name,Fname:rex===true?false:true,class:student.error.class,adress:student.error.adress},info:{name:student.info.name,Fname:rex===true?value:"",class:student.info.class,adress:student.info.adress}}
        })

    }
    OnChangeClass(e){
        const {student} = this.state
        var value = e.target.value
        var testLen = value.length>0
        this.setState({
            student : {error:{name:student.error.name,Fname:student.error.Fname,class:testLen===true?false:true,adress:student.error.adress},info:{name:student.info.name,Fname:student.info.Fname,class:testLen===true?value:"",adress:student.info.adress}}

        })

    }
    OnChangeAdress(e){
        const {student} = this.state
        var value = e.target.value
        var testLen = value.length>0
        this.setState({
            student : {error:{name:student.error.name,Fname:student.error.Fname,class:student.error.class,adress:testLen===true?false:true},info:{name:student.info.name,Fname:student.info.Fname,class:student.info.class,adress:testLen===true?value:""}}
        })

    }

    OnAddStudent(){

        const nameErr = this.state.student.error.name 
        const FnameErr = this.state.student.error.Fname 
        const classErr = this.state.student.error.class 
        const adressErr = this.state.student.error.adress

        if(nameErr == false&&FnameErr == false&&classErr == false&&adressErr==false){
            const {student} = this.state;
            $.ajax({
                type: "POST",
                url : "http://localhost/my-projects/my-app/PHP/controle/students%20handler/addEhandler.php",
                data: {"add":"true","name":student.info.name,"Fname":student.info.Fname,"class":student.info.class,"adress":student.info.adress},
                dataType : "JSON",
                success:(respond)=>{
                    var sqlErr = respond.sqlErr
                    var userErr = respond.userErr
                    if(sqlErr == true){
                        this.setState({
                            backDrop : {active:true,loding:false,success:false,name:"",message:"Somthing went wrong !"}
                        })
                    }else{
                        this.setState({
                            backDrop : {active:true,loding:false,success:userErr==true?false:true,name:userErr==true?"":student.info.name,message:userErr==true?"this name and family is already existe":""}
                        })
                    }
                },
                error:(respond)=>{
                        const Errmessage = respond.respondText
                        this.setState({
                            backDrop : {active:true,loding:false,success:false,name:"",message:Errmessage}
                        })
                },
                beforeSend:()=>{
                    this.setState({
                        backDrop : {active:true,loding:true,success:this.state.backDrop.success,name:this.state.backDrop.name,message:this.state.backDrop.message}
                    })
                }
            })
            
        }else{
            this.setState({
                student : {error:{name:(nameErr==true||nameErr==null)?true:false,Fname:FnameErr==true||FnameErr==null?true:false,class:classErr==true||classErr==null?true:false,adress:adressErr==true||adressErr==null?true:false},info:this.state.student.info},
                ErrMessage : true,
                
            })

            console.log(this.state)
        }
    }

    CleanInputs(){
        this.setState({
            student : {error:{name:null,Fname:null,class:null,adress:null},info:{name:"",Fname:"",class:"",adress:""}}
        })
    }

    render(){
        const {student,backDrop} = this.state

        return(
            <div  id="center-ele"  style={{paddingTop:100,flexGrow:1,width:"100%",height:600}} >
                <Grid   columns={12} rowGap={5} container sx={{height:"fit-content",width:"70%",borderRadius:"5px",padding:"30px 0px 30px 0px" ,backgroundColor:"#ffffff"}} >
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center"}}  xs={6} >
                        <TextField
                      id="name"
                      label="Name"
                      placeholder="Student Name..."
                      value={student.info.name}
                      error={student.error.name}
                      onChange={this.OnChangeName.bind(this)}
                        type="text"
                        color="secondary"
                        helperText={student.error.name===true?<AlertErr />:student.error.name===false?<AlertSucc type={"name"}/>:<Alert severity="info">name should be string</Alert>}
                        />
                    </Grid>
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={6} >
                        <TextField
                      id="family-name"
                      label="Family Name"
                      placeholder="Student's Family Name..."
                      value={student.info.Fname}
                        error={student.error.Fname}
                      onChange={this.OnChangeFname.bind(this)}
                        type="text"
                        color="secondary"
                        helperText={student.error.Fname===true?<AlertErr />:student.error.Fname===false?<AlertSucc type={"Family name"}/>:<Alert severity="info">family name should be string</Alert>}
                        />
                    </Grid>
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={6} >
                        <TextField
                      id="class"
                      label="Class"
                      placeholder="Student's Class..."
                      value={student.info.class}
                      error={student.error.class}
                      onChange={this.OnChangeClass.bind(this)}
                        type="text"
                        color="secondary"
                        helperText={student.error.class===true?<AlertErr />:student.error.class===false?<AlertSucc type={"class"}/>:<Alert severity="info">class is required</Alert>}
                        />
                    </Grid>
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={6} >
                        <TextField
                      id="adress"
                      label="Adress"
                      placeholder="Student's Adress..."
                      value={student.info.adress}
                      error={student.error.adress}
                      multiline={true}
                      rows={4}
                      onChange={this.OnChangeAdress.bind(this)}
                        type="text"
                        color="secondary"
                        helperText={student.error.adress===true?<AlertErr />:student.error.adress===false?<AlertSucc type={"Adress"}/>:<Alert severity="info">Adress is required</Alert>}
                        />
                    </Grid>
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center",gap:10}} xs={12} >
                        <Button onClick={this.OnAddStudent.bind(this)} style={{width:120}} variant="contained" size="large" color="secondary">
                          Add
                          <PersonAddAltIcon style={{marginLeft:5}} fontSize="medium"/>
                          
                        </Button>

                        <Button onClick={this.CleanInputs.bind(this)} style={{width:120}} variant="outlined" size="large" color="primary">
                          Clean 
                          <CleaningServicesIcon style={{marginLeft:5}} fontSize="medium"/>
                          
                        </Button>
                    </Grid>
                    <Snackbar
                      anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                      open={this.state.ErrMessage}
                      autoHideDuration={5000}
                      onClose={()=>{this.setState({ErrMessage:false})}}
                      message={<Alert severity="error" sx={{width:"fit-content",fontSize:"large"}} >pleas make sure to all the information correctly</Alert>}
                      action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{this.setState({ErrMessage:false})}}>
                          <Close fontSize="small" />
                        </IconButton>
                      }
                    />
                    <Backdrop
                        invisible={false} 
                        open={backDrop.active}
                        onClick={()=>{this.setState({backDrop : {active:false,loding:false,success:false}})}}
                    >
                        {backDrop.loding===true?<Loading />:backDrop.success===true?<OnSuccess Name={backDrop.name} />:<OnError Message={backDrop.message} />}
                    </Backdrop>
                    
                </Grid>

                

            </div>
        )
    }

}