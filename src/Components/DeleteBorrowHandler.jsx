import { Component } from "react";
import IconButton from '@mui/material/IconButton'
import { List,ListItem,ListItemText} from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import {Typography,CircularProgress,Skeleton, Snackbar, Alert } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import angry from "./../angry.png"
import $ from "jquery";
import Close from "@mui/icons-material/Close";

function Loading(){
    return(
        <div style={{width:"100%",height:"100%",padding:5}}>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
            <div style={{display:"flex" ,width:"100%",gap:30}} ><Skeleton variant="text" width="80%" height={60} /><Skeleton variant="circular" width={60} height={55} /></div>
        </div>
    )

}
function IfThereNoBorrow(){

    return(
        <div  style={{width:"100%",height:"100%",backgroundColor:"whitesmoke",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px 8px 8px 8px",padding:"0"}}>
                        
            <h1 style={{textAlign:"center",color:"gray",textShadow:"0.5px 0.5px 3px black"}}>There is no Orders here to <em style={{color:"red"}}>DELETE</em><br /><img src={angry} alt="sleep emoji"  width={100} height={100}/> </h1>
                        
        </div>
    )
}


export default class DeleteBorrow extends Component{


    constructor(props){
        super(props)
        this.state={
            loading : false,
            AllBorrow:[],
            BorrwID : null,
            NoBorrow : false,
            SnakeBar : false
            
        }
    }


    GetAllBorrow(){
        $.ajax({
            type :"GET",
            url:"http://localhost/my-projects/library-App/PHP/controle/emprunt handler/listEmprunt_Handler.php",
            data : {"GetInfo":"true"},
            dataType : "JSON",
            success : (respond)=>{
                 var infoLen = respond.info.length
                 this.setState({
                    loading : false,
                    AllBorrow : this.state.AllBorrow.length==0?this.state.AllBorrow.concat(respond.info):this.state.AllBorrow.concat([]),
                    NoBorrow  : infoLen==0?true:false
                 })
                
            },
            beforeSend : (respond)=>{
                this.setState({
                    loading : true
                })
            }
        })
    }

    DeleteFromState(index){
        this.state.AllBorrow.splice(index,1)
    }

    ActivateLoadingItem(index){
       
        this.setState({

            AllBorrow : this.state.AllBorrow.filter(
                
                (obj,objIndex)=>{
                    
                    if(objIndex==index){
                        obj.loading = true
                        return obj
                    }else{
                        return obj
                    }
                }
            )
        })
    }

    DeleteBorrowHandler(id,index){
        $.ajax({
            type:"POST",
            url : "http://localhost/my-projects/library-App/PHP/controle/emprunt%20handler/DeleteEmpruntHandler.php",
            data : {"delete":"true","id":id},
            dataType : "HTML",
            success : ()=>{
                console.log(index)
                this.DeleteFromState(index)
                this.setState({
                    SnakeBar : true
                })
            },
            beforeSend : ()=>{
                this.ActivateLoadingItem(index)
            }
            

    })
    }

    componentDidMount(){
        this.GetAllBorrow()
    }

    render(){
        const {closeBD} = this.props
        return(
            <div onClick={(e)=>{e.stopPropagation()}} style={{marginTop:100,width:"80%",height:450,justifyContent:"center",display:"flex",alignItems:"center",flexDirection:"column",backgroundColor:"white",borderRadius:"5px"}}>

                <div style={{width:"100%",height:"10%",display:"flex",justifyContent:"end",borderRadius:"5px 5px 0 0",backgroundColor:"black"}}>
                        <IconButton aria-label="" onClick={(e)=>{
                            e.stopPropagation();
                            closeBD()
                        }}>
                          <CloseIcon fontSize="large" color="error" />
                        </IconButton>
                </div>
                <div style={{width:"98%",height:"82%",overflow:"auto",backgroundColor:"whitesmoke",marginTop:20,borderRadius:"3px",padding:4}}>

                    {this.state.loading==true?<Loading />:this.state.NoBorrow==true?<IfThereNoBorrow />:
                        <List  sx={{
                          width: "100%",
                          height : "100%",
                        }}>


                                {this.state.AllBorrow.map((obj,index)=>{
                                    var id = obj.id
                                    var name = obj.name
                                    var Fname = obj.family_name
                                    var title = obj.title
                                    var writer = obj.writer
                                    var date = obj.date


                                    return(
                                        <ListItem id={id} key={index}  style={{width: "95%",marginBottom:20}}>

                                        <PersonIcon color="secondary" fontSize="large" style={{marginRight:10}} />
                                        <ListItemText primary={<Typography sx={{color:"f8f4e3",textShadow:"0.5px 0.5px 3px gray"}} variant="h5" color="initial">{name}</Typography>} secondary={ <div>-<em >{Fname}</em> </div> } />

                                        <BookIcon color="secondary" fontSize="large" style={{marginRight:10}} />
                                        <ListItemText primary={<Typography sx={{color:"f8f4e3",textShadow:"0.5px 0.5px 3px gray"}} variant="h5" color="initial">{title}</Typography>} secondary={ <div>-<em>{writer}</em> </div> } />
                                        
                                        <ListItemText primary={<Typography sx={{color:"f8f4e3",textShadow:"0.5px 0.5px 3px gray"}} variant="h5" color="initial">{date}</Typography>} />
                                        
                                        <IconButton onClick={(e)=>{
                                                this.setState({BorrwID:id})
                                                this.DeleteBorrowHandler(id,index)

                                            }} >
                                            {obj.loading==true?<CircularProgress  />:<DeleteForeverIcon  fontSize="large" color="error" />}
                                        </IconButton>

                                    </ListItem>
                                    )

                                })}
                                    
                                        
                                        

                        </List>
                    }
                    

                </div>
                <div style={{width:"100%",height:"8%"}}>

                </div>
                <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  open={this.state.SnakeBar}
                  autoHideDuration={5000}
                  onClose={()=>{this.setState({BorrwID:null})}}
                  message={<Alert severity="success" >the <em color="gray">Order</em> number {this.state.BorrwID} just got deleted succefully</Alert>}
                  action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{this.setState({SnakeBar:false})}}>
                      <Close fontSize="small" />
                    </IconButton>
                  }
                />
            </div>
        )
    }


}