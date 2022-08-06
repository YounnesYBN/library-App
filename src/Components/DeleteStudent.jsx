import { Component } from "react";
import { List,ListItem,ListItemText,ListItemAvatar,Avatar } from "@material-ui/core";
import $ from "jquery";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Alert, Typography,IconButton,CircularProgress, Snackbar,Skeleton } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { Close } from "@material-ui/icons";
import Slepp from './../sleep.png'
import databasseErr from "./../databass_error.png"



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
                            <h1 style={{textAlign:"center",color:"gray",textShadow:"0.5px 0.5px 3px black"}}>There is no students here to <em style={{color:"red"}}>DELETE</em><br /><img src={Slepp} alt="sleep emoji"  width={100} height={100}/> </h1>
                        </div>
        </div>
    )
}



export default class DeleteStudent extends Component{

    constructor(props){
        super(props)
        this.state = {
            AllStudent : {Connect:null,data:[]},
            deletedName : null,
            DeleteSnakBar : false,

            
        }

    }

    GetAllStundents(){
        $.ajax({
            type : "GET",
            url : "http://localhost/my-projects/my-app/PHP/controle/students%20handler/listEhandler.php",
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

    componentDidMount(){
        this.GetAllStundents()
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

    DeletFromState(index){
        this.state.AllStudent.data.splice(index,1)
        
    }

    DeleteStudent(index,id,fullName){
            this.setState({
                deletedName : null,
                DeleteSnakBar : false,
            })

        $.ajax({
            type:"POST",
            url : "http://localhost/my-projects/my-app/PHP/controle/students%20handler/deleteEhandler.php",
            data : {"delete":"true","id":id},
            dataType:"HTML",
            success : ()=>{
                this.DeletFromState(index)
                this.setState({
                    deletedName : fullName,
                    DeleteSnakBar : true,
                })
            },
            beforeSend : ()=>{
                this.ActivateLoadingItem(index)
            }
        })

    }

    rerandComponent(){
        this.setState({
            AllStudent : this.state.AllStudent
        })
    }
    render(){

        const{AllStudent}  = this.state;
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
                                                            this.DeleteStudent(index,id,fullName)
                                                        }} >
                                                        {obj.loading==true?<CircularProgress  />:<DeleteForeverIcon  fontSize="large" color="error" />}
                                                    </IconButton>

                                            </ListItem>
                                        )
                                    })}

                                </List>
                        <Snackbar
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                          open={this.state.DeleteSnakBar}
                          onClose={()=>{this.setState({DeleteSnakBar:false})}}
                          autoHideDuration={5000}
                          message={<Alert severity="success" ><em style={{color:"lightblue"}}>{this.state.deletedName}</em> got deleted successfully</Alert>}
                          action={
                            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{this.setState({DeleteSnakBar:false})}}>
                              <Close fontSize="small" />
                            </IconButton>
                          }
                        />
                                
                        </div>
                    </div>
                )
                
                }

                

            </div>
        )
    }

}