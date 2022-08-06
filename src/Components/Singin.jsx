import { Component } from "react";
import { Stack, TextField, Grid, Button ,Alert, IconButton} from "@mui/material";
import { Close } from "@material-ui/icons";
import $ from "jquery";
import { CircularProgress,Snackbar } from "@material-ui/core";



function Loading(){ return <CircularProgress color="secondary"/>}


class Singin extends Component{
    constructor(props){
        super(props)
        this.state ={
            userName :"",
            password :"",
            email:"",
            errors : {userName:{trigger:null, inputTextHepler: <Alert severity="info">user name should be string</Alert>},password:{trigger:null, inputTextHepler: <Alert severity="info">password is required</Alert>},email:{trigger:null, inputTextHepler: <Alert severity="info">ex: username@gmail.com</Alert>}},
            messageTriggerd:null,
            message : null,
            loadingTrigger : false,
            snakeBar : {open : false,message:null}
        }
        this.OnPasswordChange = this.OnPasswordChange.bind(this)
        this.OnUserNameChange = this.OnUserNameChange.bind(this)
        this.OnEmaildChange = this.OnEmaildChange.bind(this)
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
                errors : {userName : {trigger:false,inputTextHepler: <Alert severity="success">Correct</Alert>},password : this.state.errors.password,email:this.state.errors.email}

            })
        }else{
            this.setState({
                userName : value,
                errors : {userName : {trigger:true,inputTextHepler: <Alert severity="error">pleas make sure to fill the info correctly</Alert>},password : this.state.errors.password,email:this.state.errors.email}
            })
        }


        
    }
    OnPasswordChange(e){

        var value = e.target.value
        var test = value.length===0
        if(test===true){
            this.setState({
                password : value,
                errors : {userName : this.state.errors.userName,password : {trigger:true,inputTextHepler: <Alert severity="error">pleas fill the input</Alert>},email:this.state.errors.email}
            })
        }else{
            this.setState({
                password : value,
                errors : {userName : this.state.errors.userName,password : {trigger:false,inputTextHepler: <Alert severity="success">Correct</Alert>},email:this.state.errors.email}
            })
        }
    }
    OnEmaildChange(e){
        var value = e.target.value
        var rgx = /^[a-zA-Z]{1,}@[a-zA-Z]{1,}\.[a-zA-Z]{1,}$/
        var test = rgx.test(value)
        if(test===false){
            this.setState({
                email : value,
                errors : {userName : this.state.errors.userName,password:this.state.errors.password,email : {trigger:true,inputTextHepler: <Alert severity="error">pleas fill the input</Alert>}}
            })
        }else{
            this.setState({
                email : value,
                errors : {userName : this.state.errors.userName,password:this.state.errors.password,email : {trigger:false,inputTextHepler: <Alert severity="success">Correct</Alert>}}
            })
        }
    }

    sendData(){
        const passwordErr = this.state.errors.password.trigger;
        const userNameErr = this.state.errors.userName.trigger;
        const emailErr = this.state.errors.email.trigger;
        

        if(passwordErr===false&&userNameErr===false&&emailErr===false){
            this.setState({
                messageTriggerd:false,
            })
            $.ajax({
                type : "POST",
                url : "http://localhost/my-projects/my-app/PHP/controle/registerHandler.php",
                data : {"email":this.state.email,"username" : this.state.userName ,"password":this.state.password , "singin" : "true"},
                dataType : "JSON",
                success : (result)=>{

                            
                            const sqlErr = result.errors.sqlErr;
                            const userErr = result.errors.userErr;
                            const message = result.message;
                            this.setState({
                                userName :"",
                                password :"",
                                email :"",
                                errors : {userName:{trigger:null, inputTextHepler: <Alert severity="info">user name should be string</Alert>},password:{trigger:null, inputTextHepler: <Alert severity="info">password is required</Alert>},email:{trigger:null, inputTextHepler: <Alert severity="info">ex: username@gmail.com</Alert>}},

                                loadingTrigger : false,
                                snakeBar : {
                                    open : true,
                                    message : sqlErr==true?<Alert severity="error">{message}<IconButton size="small" aria-label="close" color="inherit" onClick={this.ColosSnakeBare}><Close fontSize="small" /></IconButton></Alert>:userErr===true?<Alert severity="error">{message}<IconButton size="small" aria-label="close" color="inherit" onClick={this.ColosSnakeBare}><Close fontSize="small" /></IconButton></Alert>:<Alert severity="success">{message}<IconButton size="small" aria-label="close" color="inherit" onClick={this.ColosSnakeBare}><Close fontSize="small" /></IconButton></Alert>
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
                        userName :"",
                        password :"",
                        email :"",
                        errors : {userName:{trigger:null, inputTextHepler: <Alert severity="info">user name should be string</Alert>},password:{trigger:null, inputTextHepler: <Alert severity="info">password is required</Alert>},email:{trigger:null, inputTextHepler: <Alert severity="info">ex: username@gmail.com</Alert>}},
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
            if((userNameErr===null||userNameErr===true)&&(passwordErr===null||passwordErr===true)&&(emailErr===null||emailErr===true)){
               
                // in case he didnt fill the info and he pressed enter
                this.setState({
                    errors : {userName : {trigger:true,inputTextHepler: <Alert severity="error">pleas make sure to fill the info correctly</Alert>},password : {trigger:true,inputTextHepler: <Alert severity="error">pleas fill the input </Alert>},email : {trigger:true,inputTextHepler: <Alert severity="error">pleas fill the input corractley </Alert>}},
                    messageTriggerd:true,
                    message : <Alert severity="error" >Pleas make sure to fill all the information and also correctly</Alert>
                })

            }else{

                this.setState({
                    errors : {
                        userName:{trigger:(userNameErr===null||userNameErr===true)?true:false, inputTextHepler: (userNameErr===null||userNameErr===true)?<Alert severity="error">pleas make sure to fill the info correctly</Alert>:<Alert severity="success">Correct</Alert>},
                        password:{trigger:(passwordErr===null||passwordErr===true)?true:false, inputTextHepler: (passwordErr===null||passwordErr===true)?<Alert severity="error">pleas fill the input </Alert>:<Alert severity="success">Correct</Alert>},
                        email:{trigger:(emailErr===null||emailErr===true)?true:false, inputTextHepler:(emailErr===null||emailErr===true)?<Alert severity="error">pleas fill the input corractley </Alert>:<Alert severity="success">Correct</Alert>},
                        messageTriggerd:true,
                        message : <Alert severity="error" >Pleas make sure to fill all the information and also correctly</Alert>
                    }
                     
                })

                
                    
            
                
            }
        
        }
        

    }


    render(){
        const {CloseSingup} = this.props
        if(this.state.loadingTrigger===true){
            return <Loading />
        }else{
            return(

                <div>
                    <Stack padding={6} rowGap={1} sx={{width : 400}}>
                        <div  style={{width:"100%",display: "flex",justifyContent: "space-between",alignItems: "center",fontFamily:"'Edu TAS Beginner', cursive",color:"b4b0a2"}}>
                                <h2 style={{margin:0 ,fontFamily:"'Dancing Script', cursive",color:"#F2676A"}}>Sing up:</h2>
                                <IconButton onClick={CloseSingup} sx={{width:30 ,height:30}} aria-label="">
                                     <Close />
                                </IconButton>
                        </div>
                        <Grid columns={6}  rowGap={2} direction="column" container>
                            <Grid height="fit-content" xs={6} display="flex" justifyContent="center" alignItems="center">
                                <TextField value={this.state.userName} helperText={this.state.errors.userName.inputTextHepler} error={this.state.errors.userName.trigger} onChange={this.OnUserNameChange} type="text"color="secondary" sx={{width:"60%"}} id="user-name" label="user name"   variant="outlined"  />
                            </Grid>
                            <Grid xs={6} height="fit-content" display="flex" justifyContent="center" alignItems="center">
                                <TextField value={this.state.email} helperText={this.state.errors.email.inputTextHepler}  error={this.state.errors.email.trigger} onChange={this.OnEmaildChange} type="text"color="secondary" sx={{width:"60%"}} id="email" label="email"   variant="outlined"  />
                            </Grid>
                            <Grid xs={6} height="fit-content"display="flex" justifyContent="center" alignItems="center">
                                <TextField value={this.state.password} helperText={this.state.errors.password.inputTextHepler} error={this.state.errors.password.trigger} onChange={this.OnPasswordChange} type="password"color="secondary" sx={{width:"60%"}} id="password" label="Password"  variant="outlined"  />
                            </Grid>
                        </Grid>
                        {this.state.messageTriggerd===true?this.state.message:null}
                        <Button  onClick={this.sendData} sx={{width:100 , alignSelf:"end",boxShadow:"0 0 3px gray"}} variant="contained" color="primary">
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

export default Singin;