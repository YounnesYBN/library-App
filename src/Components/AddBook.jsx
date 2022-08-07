import { Component } from "react";

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Alert, Snackbar, IconButton } from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Close } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress} from "@material-ui/core";
import $ from "jquery";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';


function Loading(){
    return <CircularProgress color="secondary" size={80} />
}

function OnSuccess(props){
    return <Alert severity="success" sx={{width:"fit-content",fontSize:"large"}} >the book <em style={{color:"lightBlue",padding:"0px 5px 0px 5px"}}> {props.Title} </em> by <em style={{color:"lightBlue",padding:"0px 5px 0px 5px"}}> {props.Writer} </em> is added successfully</Alert>
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


export default class AddBook extends Component{

    constructor(props){
        
        super(props)

        this.state = {

            book : {error:{writer:null,title:null,date:null},info:{writer:"",title:"",date:""}},
            ErrMessage : false,
            backDrop : {active:false,loding:false,success:null,title:"",writer:"",message:""}
            

        }
    }   

    
    OnChangeWriter(e){
        const {book} = this.state
        var value = e.target.value
        var rex = /^[a-zA-Z]{1,}$/.test(value)
        this.setState({
            book : {error:{writer:rex===true?false:true,title:book.error.title,date:book.error.date},info:{writer:rex===true?value:value,title:book.info.title,date:book.info.date}}
        })

    }
    OnChangeTitle(e){
        const {book} = this.state
        var value = e.target.value
        var testLen = value.length>0

        this.setState({
            book : {error:{writer:book.error.writer,title:testLen===true?false:true,date:book.error.date},info:{writer:book.info.writer,title:testLen===true?value:value,date:book.info.date}}
        })
        

    }

    OnChangeDate(e){
        const {book} = this.state
        var value = e.target.value
        var testLen = value.length>0

        this.setState({
            book : {error:{writer:book.error.writer,title:book.error.title,date:testLen===true?false:true},info:{writer:book.info.writer,title:book.info.title,date:testLen===true?value:value}}
        })
        

    }

    OnAddBook(){

        const writerErr = this.state.book.error.writer
        const titleErr = this.state.book.error.title
        const dateErr = this.state.book.error.date
        

        if(writerErr == false&&titleErr == false&&dateErr == false){
            console.log("success")
            const {book} = this.state;
            $.ajax({
                type: "POST",
                url : "http://localhost/my-projects/library-App/PHP/controle/books%20handler/addLhandler.php",
                data: {"add":"true","writer":book.info.writer,"title":book.info.title,"date":book.info.date},
                dataType : "JSON",
                success:(respond)=>{
                    var sqlErr = respond.sqlErr
                    var userErr = respond.userErr
                    if(sqlErr == true){
                        this.setState({
                            backDrop : {active:true,loding:false,success:false,title:"",writer:"",message:"Somthing went wrong !"}
                        })
                    }else{
                        this.setState({
                            backDrop : {active:true,loding:false,success:userErr==true?false:true,title:userErr==true?"":book.info.title,writer:userErr==true?"":book.info.writer,message:userErr==true?"this writer and book are already existe":""}
                        })
                    }
                },
                error:(respond)=>{
                        const Errmessage = respond.respondText
                        this.setState({
                            backDrop : {active:true,loding:false,success:false,title:"",writer:"",message:Errmessage}
                        })
                },
                beforeSend:()=>{
                    this.setState({
                        backDrop : {active:true,loding:true,success:this.state.backDrop.success,title:this.state.backDrop.title,writer:this.state.backDrop.writer,message:this.state.backDrop.message}
                    })
                }
            })
            
        }else{
            this.setState({
                book : {error:{writer:(writerErr==true||writerErr==null)?true:false,title:(titleErr==true||titleErr==null)?true:false,date:(dateErr==true||dateErr==null)?true:false},info:this.state.book.info},
                ErrMessage : true,
                
            })

            console.log(this.state)
        }
    }
    
    CleanInputs(){
        this.setState({
            book : {error:{writer:null,title:null,date:null},info:{writer:"",title:"",date:""}}
        })
    }


    render(){

        const {book,backDrop} = this.state

        return(
            <div  id="center-ele"  style={{paddingTop:100,flexGrow:1,width:"100%",height:600}} >
                <Grid   columns={12} rowGap={5} container sx={{height:"fit-content",width:"70%",borderRadius:"5px",padding:"30px 0px 30px 0px" ,backgroundColor:"#ffffff"}} >
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center"}}  xs={6} >
                        <TextField
                      id="writer"
                      label="Writer"
                      placeholder="Writer Name..."
                      value={book.info.writer}
                      error={book.error.writer}
                      onChange={this.OnChangeWriter.bind(this)}
                        type="text"
                        color="secondary"
                        helperText={book.error.writer===true?<AlertErr />:book.error.writer===false?<AlertSucc type={"Writer Name"}/>:<Alert severity="info">Writer name should be string</Alert>}
                        />
                    </Grid>
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={6} >
                        <TextField
                      id="title"
                      label="Title"
                      placeholder="Title of the book..."
                      value={book.info.title}
                        error={book.error.title}
                      onChange={this.OnChangeTitle.bind(this)}
                        type="text"
                        color="secondary"
                        helperText={book.error.title===true?<AlertErr />:book.error.title===false?<AlertSucc type={"Title"}/>:<Alert severity="info">Title is required</Alert>}
                        />
                    </Grid>
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={12} >
                        <TextField
                        id="date"
                        
                        value={book.info.date}
                        error={book.error.date}
                        onChange={this.OnChangeDate.bind(this)}
                        type="date"
                        color="secondary"
                        helperText={book.error.date===true?<AlertErr />:book.error.date===false?<AlertSucc type={"Date"}/>:<Alert severity="info">Date is required</Alert>}
                        />
                    </Grid>
                    
                    <Grid style={{display:"flex",justifyContent:"center",alignItems:"center",gap:10}} xs={12} >
                        <Button onClick={this.OnAddBook.bind(this)} style={{width:120}} variant="contained" size="large" color="secondary">
                          Add
                          <NoteAddIcon style={{marginLeft:5}} fontSize="medium"/>
                          
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
                        onClick={()=>{this.setState({backDrop : {active:false,loding:false,title:"",writer:"",success:false}})}}
                    >
                        {backDrop.loding===true?<Loading />:backDrop.success===true?<OnSuccess  Title={backDrop.title} Writer={backDrop.writer} />:<OnError Message={backDrop.message} />}
                    </Backdrop>
                    
                </Grid>

                

            </div>
        )
        

    }

}