import { Component } from "react";
import { Stack, TextField, Grid, Button ,Alert, IconButton} from "@mui/material";
import { Close} from "@material-ui/icons";
import $ from "jquery";
import { CircularProgress, Snackbar } from "@material-ui/core";
import { ReactSession } from 'react-client-session';




function Loading(){ return <CircularProgress color="secondary"/>}





class Login extends Component{

    constructor(props){
        super(props)
        this.state ={
            userName :"",
            password :"",
            errors : {userName:{trigger:null, inputTextHepler: <Alert severity="info">user name should be string </Alert>},password:{trigger:null, inputTextHepler: <Alert severity="info">enter your password</Alert>}},
            messageTriggerd:null,
            message : null,
            loadingTrigger : false,
            snakeBar : {open : false,message:null},

        }
        this.OnPasswordChange = this.OnPasswordChange.bind(this)
        this.OnUserNameChange = this.OnUserNameChange.bind(this)
        this.sendData = this.sendData.bind(this)
        this.ColosSnakeBare = this.ColosSnakeBare.bind(this)

    }

    
    ColosSnakeBare(){
        this.setState({
            snakeBar : {open : false,message:null}
        })
    }

    OnUserNameChange(e){

        var value = e.target.value
        var rgx = /^[a-z A-Z]{1,}$/
        var test = rgx.test(value)
        if(test===true){
            this.setState({
                userName : value,
                errors : {userName : {trigger:false,inputTextHepler: <Alert severity="success">Correct</Alert>},password : this.state.errors.password}

            })
        }else{
            this.setState({
                userName : value,
                errors : {userName : {trigger:true,inputTextHepler: <Alert severity="error">pleas make sure to fill the info correctly</Alert>},password : this.state.errors.password}
            })
        }

        
    }

    OnPasswordChange(e){

        var value = e.target.value
        var test = value.length===0
        if(test===true){
            this.setState({
                password : value,
                errors : {userName : this.state.errors.userName,password : {trigger:true,inputTextHepler: <Alert severity="error">pleas fill the input</Alert>}}
            })
        }else{
            this.setState({
                password : value,
                errors : {userName : this.state.errors.userName,password : {trigger:false,inputTextHepler: <Alert severity="success">Correct</Alert>}}
            })
        }
    }

    sendData(){
        const passwordErr = this.state.errors.password.trigger;
        const userNameErr = this.state.errors.userName.trigger;
        

        if(passwordErr===false&&userNameErr===false){

            this.setState({
                messageTriggerd:false,
            })
            $.ajax({
                type : "GET",
                url : "http://localhost/my-projects/my-app/PHP/controle/loginHandler.php",
                data : {"username" : this.state.userName ,"password":this.state.password , "login" : "true"},
                dataType : "JSON",
                success : (result)=>{
                            const sqlErr = result.errors.sqlErr;
                            const userErr = result.errors.userErr;
                            const message = result.message;
                            this.setState({
                                userName:"",
                                password:"",
                                errors : {userName:{trigger:null, inputTextHepler: <Alert severity="info">user name should be string </Alert>},password:{trigger:null, inputTextHepler: <Alert severity="info">enter your password</Alert>}},
                                loadingTrigger : false,
                                snakeBar : {
                                    open : true,
                                    message : sqlErr===true?<Alert severity="error">{message}<IconButton size="small" aria-label="close" color="inherit" onClick={this.ColosSnakeBare}><Close fontSize="small" /></IconButton></Alert>:userErr===true?<Alert severity="error">{message}<IconButton size="small" aria-label="close" color="inherit" onClick={this.ColosSnakeBare}><Close fontSize="small" /></IconButton></Alert>:<Alert severity="success">{message}<IconButton size="small" aria-label="close" color="inherit" onClick={this.ColosSnakeBare}><Close fontSize="small" /></IconButton></Alert>
                                }

                            })

                            if(userErr===false&&sqlErr===false){
                                localStorage.setItem("user",JSON.stringify({pass:true,name:result.username}))
                                this.props.getAccess();
                            }
                            
                            
                },
                error : (error)=>{
                    console.log(error)
                    this.setState({
                        userName:"",
                        password:"",
                        errors : {userName:{trigger:null, inputTextHepler: <Alert severity="info">user name should be string </Alert>},password:{trigger:null, inputTextHepler: <Alert severity="info">enter your password</Alert>}},
                        loadingTrigger : false
                    })
                },
                beforeSend : ()=>{
                    this.setState({
                        loadingTrigger : true
                    })
                }
            })
        }else{
            if((userNameErr===null||userNameErr===true)&&(passwordErr===null||passwordErr===true)){
                // in case he didnt fill the info and he pressed enter
                this.setState({
                    errors : {userName : {trigger:true,inputTextHepler: <Alert severity="error">pleas make sure to fill the info correctly</Alert>},password : {trigger:true,inputTextHepler: <Alert severity="error">pleas fill the input </Alert>}},
                    messageTriggerd:true,
                    message : <Alert severity="error" >Pleas make sure to fill all the information and also correctly</Alert>
                    
                })
            }else{
                if(userNameErr===null||userNameErr===true){
                    this.setState({
                        errors : {userName : {trigger:true,inputTextHepler: <Alert severity="error">pleas make sure to fill the info correctly</Alert>},password : this.state.errors.password},
                        messageTriggerd:true,
                        message : <Alert severity="error" >Pleas make sure to fill all the information and also correctly</Alert>
                    })
                }else{
                    this.setState({
                        errors : {userName : this.state.errors.userName,password : {trigger:true,inputTextHepler: <Alert severity="error">pleas  fill the input</Alert>}},
                        messageTriggerd:true,
                        message : <Alert severity="error" >Pleas make sure to fill all the information and also correctly</Alert>
                    })
                }
                
            }
        }
        

    }
    

    render(){
        const {CloseLogin} = this.props
        if(this.state.loadingTrigger===true){
            return <Loading />
        }else{
            return(

                    <div>
                        <Stack padding={6} spacing={2} sx={{width : 400}}>
                            <div  style={{width:"100%",display: "flex",justifyContent: "space-between",alignItems: "center",fontFamily:"'Edu TAS Beginner', cursive",color:"b4b0a2"}}>
                                    <h2 style={{margin:0,color:"#4d4c46",fontFamily:"'Edu TAS Beginner', cursive"}}>Log In:</h2>
                                    <IconButton onClick={CloseLogin} sx={{width:30 ,height:30}} aria-label="">
                                         <Close />
                                    </IconButton>
                            </div>
                            <Grid columns={6}  rowGap={2} direction="column" container>
                                <Grid xs={6} display="flex" justifyContent="center" alignItems="center">
                                    <TextField  helperText={this.state.errors.userName.inputTextHepler} error={this.state.errors.userName.trigger} onChange={this.OnUserNameChange} type="text"color="secondary" sx={{width:"60%"}} id="user-name" label="user name"   variant="outlined" value={this.state.userName} />
                                </Grid>
                                <Grid xs={6} display="flex" justifyContent="center" alignItems="center">
                                    <TextField  helperText={this.state.errors.password.inputTextHepler} error={this.state.errors.password.trigger} onChange={this.OnPasswordChange} type="password" color="secondary" sx={{width:"60%"}} id="password" label="Password" variant="outlined" value={this.state.password}/>
                                </Grid>
                            </Grid>
                            {this.state.messageTriggerd===true?this.state.message:null}
                            <Button onClick={this.sendData}  sx={{width:100 , alignSelf:"end",boxShadow:"0 0 3px gray"}} variant="contained" color="primary">
                              enter
                            </Button>
                        </Stack>
                        <Snackbar
                              anchorOrigin={{ vertical:"bottom", horizontal: 'center' }}
                              open={this.state.snakeBar.open}
                              autoHideDuration={5000}
                              onClose={this.ColosSnakeBare}
                              
                            >
                                {this.state.snakeBar.message}
                        </Snackbar>
                    </div>


            )
        }
    }
}
export default Login;