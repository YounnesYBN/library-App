import { Component } from "react";
import { List,ListItem,ListItemText,ListItemAvatar,Avatar,Backdrop } from "@material-ui/core";
import $ from "jquery";
import EditIcon from '@mui/icons-material/Edit'
import {Alert, Typography,IconButton,Button,CircularProgress, Snackbar,Skeleton, Grid, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { Close } from "@material-ui/icons";
import Slepp from './../sleep.png'
import databasseErr from "./../databass_error.png"
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveAsIcon from '@mui/icons-material/SaveAs';




function AlertErr(){
  
    return <Alert severity="error" >please fill the information correctly</Alert>
}

function AlertSucc(props){
    return <Alert severity="success" sx={{width:"fit-content",fontSize:"large"}}>{props.type} is correct.</Alert>
}


function Loading(){
    return(
        <div style={{width:"50%",height:"50%",padding:5}}>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
        </div>
    )

}

function Error(){
    return (
        <div style={{width:"50%",height:"50%",display:"flex",flexDirection:"column",gap:20,justifyContent:"center",alignItems:"center"}}>
            <Alert id="delete-student-error" severity="error" sx={{textAlign:"center"}}> somthing went wrong  </Alert>
            <img  src={databasseErr} alt="databasse" width={70} height={70}/>
        </div>
    )
}

function IfThereNoStudent(){

    return(
        <div id="con-delete-list" style={{width:"80%",height:"70%",backgroundColor:"#D6D2C3",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px 8px 8px 8px",padding:"8px 0px 8px 0px"}}>
                        <div style={{width:"95%",height:"75%",overflow: 'auto',padding:20,backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <h1 style={{textAlign:"center",color:"gray",textShadow:"0.5px 0.5px 3px black"}}>There is no students here to <em style={{color:"lightgreen"}}>EDITE</em><br /><img src={Slepp} alt="sleep emoji"  width={100} height={100}/> </h1>
                        </div>
        </div>
    )
}



export default class EditeStudent extends Component{

    constructor(props){
        super(props)
        this.state = {
            AllStudent : {Connect:null,data:[]},
            EditedFullName : "",
            EditeSnakBar : false,
            EditeBackDrop:false,
            NewStudent : {error:{name:null,Fname:null,class:null,adress:null},info:{name:"",Fname:"",class:"",adress:""}},
            editedID : null,
            alert : {error:null},
            oldName : "",
            oldFname :"",
            loadingByIndex : null,
            justToRerender : 0,
        }

    }
    OnChangeName(e){
        const {NewStudent} = this.state
        var value = e.target.value
        var rex = /^[a-zA-Z]{1,}$/.test(value)
        this.setState({
            NewStudent : {error:{name:rex===true?false:true,Fname:NewStudent.error.Fname,class:NewStudent.error.class,adress:NewStudent.error.adress},info:{name:rex===true?value:value,Fname:NewStudent.info.Fname,class:NewStudent.info.class,adress:NewStudent.info.adress}}
        })

    }

    OnChangeFname(e){
        const {NewStudent} = this.state
        var value = e.target.value
        var rex = /^[a-zA-Z]{1,}$/.test(value)
        this.setState({
            NewStudent : {error:{name:NewStudent.error.name,Fname:rex===true?false:true,class:NewStudent.error.class,adress:NewStudent.error.adress},info:{name:NewStudent.info.name,Fname:rex===true?value:value,class:NewStudent.info.class,adress:NewStudent.info.adress}}
        })

    }

    OnChangeClass(e){
        const {NewStudent} = this.state
        var value = e.target.value
        var testLen = value.length>0
        this.setState({
            NewStudent : {error:{name:NewStudent.error.name,Fname:NewStudent.error.Fname,class:testLen===true?false:true,adress:NewStudent.error.adress},info:{name:NewStudent.info.name,Fname:NewStudent.info.Fname,class:testLen===true?value:"",adress:NewStudent.info.adress}}

        })

    }

    OnChangeAdress(e){
        const {NewStudent} = this.state
        var value = e.target.value
        var testLen = value.length>0
        this.setState({
            NewStudent : {error:{name:NewStudent.error.name,Fname:NewStudent.error.Fname,class:NewStudent.error.class,adress:testLen===true?false:true},info:{name:NewStudent.info.name,Fname:NewStudent.info.Fname,class:NewStudent.info.class,adress:testLen===true?value:""}}
        })

    }
    CleanInputs(){
        this.setState({
            NewStudent : {error:{name:null,Fname:null,class:null,adress:null},info:{name:"",Fname:"",class:"",adress:""}}
        })
    }

    ActiveBackDrop(){
        this.setState({EditeBackDrop:true})
        console.log(this.state.EditeBackDrop)
    }

    UnActiveBackDrop(){
        this.setState({EditeBackDrop:false})

        console.log(this.state.EditeBackDrop)
    }

    SetTextFildsWithOldInfo(name,Fname,Class,adress){
        this.setState({
            NewStudent : {error:{name:false,Fname:false,class:false,adress:false},info:{name:name,Fname:Fname,class:Class,adress:adress}},
        })
    }
    

    GetAllStundents(){
        $.ajax({
            type : "GET",
            url : "http://localhost/my-projects/library-App/PHP/controle/students%20handler/listEhandler.php",
            data : {"GetInfo":"true"},
            dataType :"JSON",
            success : (respond)=>{
                console.log(respond)
                var sqlErr = respond.err
                var lenArray = this.state.AllStudent.data.length
                
                if(sqlErr==false){
                    this.setState({AllStudent: {Connect:true,data:lenArray==0?this.state.AllStudent.data.concat(respond.info):this.state.AllStudent.data.concat([])}})
                }else{
                    this.setState({AllStudent: {Connect:false,data:[]}})
                }
                
            },
            erorr : (respond)=>{
                
                this.setState({AllStudent : {Connect:false,data:[] }}) 
            }

        })
    }

    
    
    ActivateLoadingItem(index){
        
        this.setState({
        AllStudent : {
            Connect:this.state.AllStudent.Connect,
            data:this.state.AllStudent.data.filter((obj,objIndex)=>{
                if(objIndex==index){
                    obj.loading = true
                    return obj
                }else{
                    return obj
                }
            })
        }
    
    })

    
    }

        UnActivateLoadingItem(index){

            this.setState({
            AllStudent : {
                Connect:this.state.AllStudent.Connect,
                data:this.state.AllStudent.data.filter((obj,objIndex)=>{
                    if(objIndex==index){
                        obj.loading = false
                        return obj
                    }else{
                        return obj
                    }
                })
            }
        
        })
    }   

    setRquireState(fullName,id,name,Fname,index){
        this.setState({
            EditedFullName:fullName,
            editedID:id,
            oldName : name,
            oldFname : Fname,
            loadingByIndex : index
        })
    }

    unsetRquireState(){
        this.setState({
            editedID:null,
            oldName : "",
            oldFname : "",
            loadingByIndex : null
        })
    }

    

    OnEditeStudent(){

        const nameErr = this.state.NewStudent.error.name 
        const FnameErr = this.state.NewStudent.error.Fname 
        const classErr = this.state.NewStudent.error.class 
        const adressErr = this.state.NewStudent.error.adress

        if(nameErr == false&&FnameErr == false&&classErr == false&&adressErr==false){
            const {NewStudent} = this.state;
            this.UnActiveBackDrop();
            $.ajax({
                type: "POST",
                url : "http://localhost/my-projects/library-App/PHP/controle/students%20handler/editeEhandler.php",
                data: {"edite":"true","name":NewStudent.info.name,"Fname":NewStudent.info.Fname,"class":NewStudent.info.class,"adress":NewStudent.info.adress,"oldName":this.state.oldName,"oldFname":this.state.oldFname,id:this.state.editedID},
                dataType : "JSON",
                success : (respond)=>{
                    var userErr = respond.userErr
                    if(userErr == true){
                        this.setState({
                            EditeSnakBar : true,
                            alert : {error:true},
                        })
                        
                        
                        
                    }else{

                        this.setState({
                            EditeSnakBar : true,
                            alert : {error:false},
                        })
                        
                        setTimeout(()=>{window.location.reload()},2000)
                        
                        
                        
                        
                    }
                    this.UnActivateLoadingItem(this.state.loadingByIndex);
                    this.CleanInputs()
                    this.unsetRquireState()
                    

                },
                
                beforeSend:()=>{
                    this.ActivateLoadingItem(this.state.loadingByIndex);
                }
            })
        }else{
            this.setState({
                NewStudent : {error:{name:(nameErr==true||nameErr==null)?true:false,Fname:FnameErr==true||FnameErr==null?true:false,class:classErr==true||classErr==null?true:false,adress:adressErr==true||adressErr==null?true:false},info:this.state.NewStudent.info},
            })
        }
    }
    
    componentDidMount(){
        this.GetAllStundents()
    }

    render(){
        
        const{AllStudent,NewStudent,EditeBackDrop}  = this.state;
        return(
            <div    style={{paddingTop:100,flexGrow:1,width:"100%",height:507,display:"flex",justifyContent:"center",alignItems:"center"}} >

                {AllStudent.Connect==null?<Loading />
                :AllStudent.Connect==false?<Error />

                :AllStudent.data.length==0? <IfThereNoStudent />:
                (
                    <div id="con-delete-list" style={{width:"80%",height:"70%",backgroundColor:"#D6D2C3",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px 8px 8px 8px",padding:"8px 0px 8px 0px"}}>

                        <div style={{width:"95%",height:"75%",overflow: 'auto',padding:20,backgroundColor:"white",display:AllStudent.data.length==0?"flex":"",justifyContent:AllStudent.data.length==0?"center":"",alignItems:AllStudent.data.length==0?"center":""}}>

                                
                                
                                <List  sx={{
                                  width: "100%",
                                  height : "100%",
                                }}>

                                    {
                                       AllStudent.data.map((obj,index)=>{
                                        var id = obj.id
                                        var name =obj.name
                                        var Fname = obj.family_name
                                        var Class = obj.class
                                        var adress = obj.adress
                                        var fullName = name+" "+Fname
                                        
                                        
                                        return(

                                            <ListItem id="item"  key={obj.id} style={{width: "95%",marginBottom:20}}>
                                                <ListItemAvatar><Avatar style={{backgroundColor:"#E5446D"}}> { obj.name[0]+obj.name[1]}</Avatar></ListItemAvatar>

                                                    <ListItemText primary={<Typography sx={{color:"f8f4e3",textShadow:"0.5px 0.5px 3px black"}} variant="h4" color="initial">{fullName.toUpperCase()}</Typography>} secondary={ <div><SchoolIcon fontSize="small"/> : <em>{Class}</em>  <LocationOnIcon fontSize="small" /> : <em>{adress}</em></div> } />
                                        
                                                    <IconButton onClick={()=>{
                                                            this.setRquireState(fullName,id,name,Fname,index)
                                                            this.SetTextFildsWithOldInfo(name,Fname,Class,adress)
                                                            this.ActiveBackDrop()
                                                            
                                                        }} >
                                                        {obj.loading==true?<CircularProgress  />:<EditIcon  fontSize="large" color="info" />}
                                                    </IconButton>

                                            </ListItem>
                                        )
                                    })}

                                </List>

                        {/* //////////////////////////////////////////SNAKE BAR////////////////////////////////////////////////// */}
                        
                        <Snackbar
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                          open={this.state.EditeSnakBar}
                          onClose={()=>{this.setState({EditeSnakBar:false})}}
                          autoHideDuration={5000}
                          message={this.state.alert.error==false?<Alert severity="success" >The changes are applied successfully on <em style={{color:"lightblue"}}>{this.state.EditedFullName}</em></Alert>:<Alert severity="error" >The changes diden't apply because name and family name are already taken </Alert>}
                          action={
                            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{this.setState({EditeSnakBar:false})}}>
                              <Close fontSize="small" />
                            </IconButton>
                          }

                          
                        />

                        {/* ////////////////////////////////////////////// BACK DROP/////////////////////////////////////////////////////////// */}

                        <Backdrop style={{zIndex:1,backgroundColor:"#2a2b2a"}} open={EditeBackDrop}   
                            onClick={()=>{
                                this.setState({EditeBackDrop:true});
                                this.unsetRquireState();
                                this.CleanInputs();
                                
                            }} >
                        <div id="editBox" onClick={(e)=>{e.stopPropagation()}} style={{marginTop:100,width:700,height:450,backgroundColor:"whitesmoke",borderRadius:"5px",padding:10}}>
                            <div style={{height:"7%",display:"flex",justifyContent:"flex-end"}}>
                                <Button onClick={()=>{
                                    this.UnActiveBackDrop()
                                    this.setState.apply({editedID:null})
                                    }}>
                                    <Close fontSize="large" color="error" />
                                </Button>
                            </div>
                            <Grid  container columns={12} sx={{width:"100%",height:"80%"} }>
                                <Grid xs={6} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <TextField 
                                    value={NewStudent.info.name}
                                    onChange={this.OnChangeName.bind(this)}
                                    error={NewStudent.error.name}
                                    label="Name"
                                    id="name"
                                    helperText={ NewStudent.error.name===true?<AlertErr />: NewStudent.error.name===false?<AlertSucc type={"name"}/>:<Alert severity="info">name should be string</Alert>}

                                    />
                                </Grid>
                                <Grid xs={6} sx={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <TextField 
                                    value={NewStudent.info.Fname}
                                    onChange={this.OnChangeFname.bind(this)}
                                    error={NewStudent.error.Fname}
                                    label="Family name"
                                    id="Fname"
                                    helperText={ NewStudent.error.Fname===true?<AlertErr />: NewStudent.error.Fname===false?<AlertSucc type={"Family name"}/>:<Alert severity="info">family name should be string</Alert>}
                                    
                                    />
                                </Grid>
                                <Grid xs={6} sx={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <TextField 
                                    value={NewStudent.info.class}
                                    onChange={this.OnChangeClass.bind(this)}
                                    error={NewStudent.error.class}
                                    label="Class"
                                    id="class"
                                    helperText={ NewStudent.error.class===true?<AlertErr />: NewStudent.error.class===false?<AlertSucc type={"Class"}/>:<Alert severity="info">Class is required</Alert>}
                                    />
                                </Grid>
                                <Grid xs={6} sx={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <TextField
                                    value={NewStudent.info.adress}
                                    onChange={this.OnChangeAdress.bind(this)}
                                    error={NewStudent.error.adress}
                                    label="Adress"
                                    id="adress"
                                    helperText={ NewStudent.error.adress===true?<AlertErr />: NewStudent.error.adress===false?<AlertSucc type={"Adress"}/>:<Alert severity="info">adress is required </Alert>}
                                    />
                                </Grid>
                            </Grid>

                            <div style={{height:"13%",display:"flex",justifyContent:"center",gap:10}}>
                                <Button onClick={this.OnEditeStudent.bind(this)} variant="contained" color="info">
                                    <SaveAsIcon />
                                </Button>
                                <Button onClick={this.CleanInputs.bind(this)} variant="outlined" color="secondary" >
                                    <CleaningServicesIcon color="secondary" />
                                </Button>
                            </div>        
                        </div>
                        </Backdrop>
                        
                                
                        </div>
                    </div>

                    
                )
                
                }

                

            </div>
        )
    }

}