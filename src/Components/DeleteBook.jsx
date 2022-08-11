import { Component } from "react";
import { List,ListItem,ListItemText,ListItemAvatar,Avatar } from "@material-ui/core";
import $ from "jquery";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Alert, Typography,IconButton,CircularProgress, Snackbar,Skeleton } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Close } from "@material-ui/icons";
import angry from './../angry.png';
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

function IfThereNoBooks(){

    return(
        <div id="con-delete-list" style={{width:"80%",height:"70%",backgroundColor:"#D6D2C3",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px 8px 8px 8px",padding:"8px 0px 8px 0px"}}>
                        <div style={{width:"95%",height:"75%",overflow: 'auto',padding:20,backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <h1 style={{textAlign:"center",color:"gray",textShadow:"0.5px 0.5px 3px black"}}>There is no Books here to <em style={{color:"red"}}>DELETE</em><br /><img src={angry} alt="sleep emoji"  width={100} height={100}/> </h1>
                        </div>
        </div>
    )
}



export default class DeleteBook extends Component{

    constructor(props){
        super(props)
        this.state = {
            AllBook : {Connect:null,data:[]},
            deleted_Title_Writer : null,
            DeleteSnakBar : false,

            
        }

    }

    GetAllBooks(){
        $.ajax({
            type : "GET",
            url : "http://localhost/my-projects/library-App/PHP/controle/books%20handler/listLhandler.php",
            data : {"GetInfo":"true"},
            dataType :"JSON",
            success : (respond)=>{
                console.log(respond)
                var sqlErr = respond.err
                var lenArray = this.state.AllBook.data.length
                
                if(sqlErr==false){
                    this.setState({AllBook: {Connect:true,data:lenArray==0?this.state.AllBook.data.concat(respond.info):this.state.AllBook.data.concat([])}})
                }else{
                    this.setState({AllBook: {Connect:false,data:[]}})
                }
                
            },
            erorr : (respond)=>{
                
                this.setState({AllBook : {Connect:false,data:[] }}) 
            }

        })
    }

    componentDidMount(){
        this.GetAllBooks()
    }

    ActivateLoadingItem(index){
        
       this.setState({
        AllBook : {
            Connect:this.state.AllBook.Connect,
            data:this.state.AllBook.data.filter((obj,objIndex)=>{
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
        this.state.AllBook.data.splice(index,1)
        
    }

    DeleteBooks(index,id,fullName){
            this.setState({
                deletedName : null,
                DeleteSnakBar : false,
            })

        $.ajax({
            type:"POST",
            url : "http://localhost/my-projects/library-App/PHP/controle/books%20handler/deleteLhandler.php",
            data : {"delete":"true","id":id},
            dataType:"HTML",
            success : ()=>{
                this.DeletFromState(index)
                this.setState({
                    deleted_Title_Writer : fullName,
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
            AllBook : this.state.AllBook
        })
    }
    render(){

        const{AllBook}  = this.state;
        return(
            <div    style={{paddingTop:100,flexGrow:1,width:"100%",height:507,display:"flex",justifyContent:"center",alignItems:"center"}} >

                {AllBook.Connect==null?<Loading />
                :AllBook.Connect==false?<Error />

                :AllBook.data.length==0? <IfThereNoBooks />:
                (
                    <div id="con-delete-list" style={{width:"80%",height:"70%",backgroundColor:"#D6D2C3",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px 8px 8px 8px",padding:"8px 0px 8px 0px"}}>
                        <div style={{width:"95%",height:"75%",overflow: 'auto',padding:20,backgroundColor:"white",display:"",justifyContent:"",alignItems:""}}>

                                
                                <List  sx={{
                                  width: "100%",
                                  height : "100%",
                                }}>

                                    {
                                       AllBook.data.map((obj,index)=>{
                                        var id = obj.id
                                        var title =obj.title
                                        var writer = obj.writer
                                        var date = obj.date
                                        var full_title_writer = title+" by "+writer
                                        
                                        return(

                                            <ListItem id="item"  key={id} style={{width: "95%",marginBottom:20}}>
                                                <ListItemAvatar><Avatar style={{backgroundColor:"#E5446D"}}> { title[0]+title[1]}</Avatar></ListItemAvatar>

                                                    <ListItemText primary={<Typography sx={{color:"f8f4e3",textShadow:"0.5px 0.5px 3px black"}} variant="h4" color="initial">{full_title_writer.toUpperCase()}</Typography>} secondary={ <div><DateRangeIcon fontSize="small"/> : <em>{date}</em> </div> } />
                                        
                                                    <IconButton onClick={()=>{
                                                            this.DeleteBooks(index,id,full_title_writer)
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
                          message={<Alert severity="success" ><em style={{color:"lightblue"}}>{this.state.deleted_Title_Writer}</em> got deleted successfully</Alert>}
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