import { Component } from "react";
import { List,ListItem,ListItemText,ListItemAvatar,Avatar,Backdrop } from "@material-ui/core";
import $ from "jquery";
import EditIcon from '@mui/icons-material/Edit'
import {Alert, Typography,IconButton,Button,CircularProgress, Snackbar,Skeleton, Grid, TextField } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
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

function IfThereNoBooks(){

    return(
        <div id="con-delete-list" style={{width:"80%",height:"70%",backgroundColor:"#D6D2C3",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px 8px 8px 8px",padding:"8px 0px 8px 0px"}}>
                        <div style={{width:"95%",height:"75%",overflow: 'auto',padding:20,backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <h1 style={{textAlign:"center",color:"gray",textShadow:"0.5px 0.5px 3px black"}}>There is no students here to <em style={{color:"lightgreen"}}>EDITE</em><br /><img src={Slepp} alt="sleep emoji"  width={100} height={100}/> </h1>
                        </div>
        </div>
    )
}



export default class EditeBook extends Component{

    constructor(props){
        super(props)
        this.state = {
            AllBooks : {Connect:null,data:[]},
            full_title_writer : "",
            EditeSnakBar : false,
            EditeBackDrop:false,
            NewBook : {error:{writer:null,title:null,date:null},info:{writer:"",title:"",date:""}},
            editedID : null,
            alert : {error:null},
            oldWriter : "",
            oldTitle:"",
            loadingByIndex : null,
        }

    }
    OnChangeWriter(e){
        const {NewBook} = this.state
        var value = e.target.value
        var rex = /^[a-zA-Z]{1,}$/.test(value)
        this.setState({
            NewBook : {error:{writer:rex===true?false:true,title:NewBook.error.title,date:NewBook.error.date},info:{writer:rex===true?value:"",title:NewBook.info.title,date:NewBook.info.date}}
        })
        console.log(this.state.NewBook.info.title)

    }

    OnChangeTitle(e){
        const {NewBook} = this.state
        var value = e.target.value
        var testLen = value.length>0
        this.setState({
            NewBook : {error:{writer:NewBook.error.writer,title:testLen===true?false:true,date:NewBook.error.date},info:{writer:NewBook.info.writer,title:testLen===true?value:"",date:NewBook.info.date}}
        })
        

    }

    OnChangeDate(e){
        const {NewBook} = this.state
        var value = e.target.value
        var testLen = value.length>0
        this.setState({
            NewBook : {error:{writer:NewBook.error.writer,title:NewBook.error.title,date:testLen===true?false:true},info:{writer:NewBook.info.writer,title:NewBook.info.title,date:testLen===true?value:""}}
        })

        

    }

    
    CleanInputs(){
        this.setState({
            NewBook : {error:{writer:null,title:null,date:null},info:{writer:"",title:"",date:""}},
        })
    }

    ActiveBackDrop(){
        this.setState({EditeBackDrop:true})
        
    }

    UnActiveBackDrop(){
        this.setState({EditeBackDrop:false})

    }

    SetTextFildsWithOldInfo(writer,title,date){
        this.setState({
            NewBook : {error:{writer:false,title:false,date:false},info:{writer:writer,title:title,date:date}},
        })
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
                var lenArray = this.state.AllBooks.data.length
                
                if(sqlErr==false){
                    this.setState({AllBooks: {Connect:true,data:lenArray==0?this.state.AllBooks.data.concat(respond.info):this.state.AllBooks.data.concat([])}})
                }else{
                    this.setState({AllBooks: {Connect:false,data:[]}})
                }
                
            },
            erorr : (respond)=>{
                
                this.setState({AllBooks : {Connect:false,data:[] }}) 
            }

        })
    }

    
    
    ActivateLoadingItem(index){
        
        this.setState({
            AllBooks : {
                Connect:this.state.AllBooks.Connect,
                data:this.state.AllBooks.data.filter((obj,objIndex)=>{
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
                AllBooks : {
                    Connect:this.state.AllBooks.Connect,
                    data:this.state.AllBooks.data.filter((obj,objIndex)=>{
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

    setRquireState(fullName,id,writer,title,index){
        this.setState({
            full_title_writer:fullName,
            editedID:id,
            oldWriter : writer,
            oldTitle : title,
            loadingByIndex : index
        })
    }

    unsetRquireState(){
        this.setState({
            editedID:null,
            oldWriter : "",
            oldTitle : "",
            loadingByIndex : null
        })
    }

    

    OnEditeBook(){

        const WriterErr = this.state.NewBook.error.writer
        const titleErr = this.state.NewBook.error.title
        const dateErr = this.state.NewBook.error.date 
        
        if( WriterErr== false&&titleErr == false&&dateErr == false){
            const {NewBook} = this.state;
            this.UnActiveBackDrop();
            $.ajax({
                type: "POST",
                url : "http://localhost/my-projects/library-App/PHP/controle/books%20handler/editeLhandler.php",
                data: {"edite":"true","writer":NewBook.info.writer,"title":NewBook.info.title,"date":NewBook.info.date,"oldWriter":this.state.oldWriter,"oldTitle":this.state.oldTitle,"id":this.state.editedID},
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
                NewBook : {error:{writer:WriterErr==false?false:true,title:titleErr==false?false:true,date:dateErr==false?false:true},info:this.state.NewBook.info},
            })
        }
    }
    
    componentDidMount(){
        this.GetAllBooks()
    }

    render(){
        
        const{AllBooks,NewBook,EditeBackDrop}  = this.state;
        return(
            <div    style={{paddingTop:100,flexGrow:1,width:"100%",height:507,display:"flex",justifyContent:"center",alignItems:"center"}} >

                {AllBooks.Connect==null?<Loading />
                :AllBooks.Connect==false?<Error />

                :AllBooks.data.length==0? <IfThereNoBooks />:
                (
                    <div id="con-delete-list" style={{width:"80%",height:"70%",backgroundColor:"#D6D2C3",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px 8px 8px 8px",padding:"8px 0px 8px 0px"}}>

                        <div style={{width:"95%",height:"75%",overflow: 'auto',padding:20,backgroundColor:"white",display:AllBooks.data.length==0?"flex":"",justifyContent:AllBooks.data.length==0?"center":"",alignItems:AllBooks.data.length==0?"center":""}}>

                                
                                
                                <List  sx={{
                                  width: "100%",
                                  height : "100%",
                                }}>

                                    {
                                       AllBooks.data.map((obj,index)=>{
                                        var id = obj.id
                                        var writer =obj.writer
                                        var title = obj.title
                                        var date = obj.date
                                        
                                        var full_title_writer = title+" by "+writer
                                        
                                        
                                        return(

                                            <ListItem id="item"  key={obj.id} style={{width: "95%",marginBottom:20}}>
                                                <ListItemAvatar><Avatar style={{backgroundColor:"#E5446D"}}> { title[0]+title[1]}</Avatar></ListItemAvatar>

                                                    <ListItemText primary={<Typography sx={{color:"f8f4e3",textShadow:"0.5px 0.5px 3px black"}} variant="h4" color="initial">{full_title_writer.toUpperCase()}</Typography>} secondary={ <div><DateRangeIcon fontSize="small"/> : <em>{date}</em> </div> } />
                                        
                                                    <IconButton onClick={()=>{
                                                            this.setRquireState(full_title_writer,id,writer,title,index)
                                                            this.SetTextFildsWithOldInfo(writer,title,date)
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
                          message={this.state.alert.error==false?<Alert severity="success" >The changes are applied successfully on <em style={{color:"lightblue"}}>{this.state.full_title_writer}</em></Alert>:<Alert severity="error" >The changes diden't apply because title and family writer are already exist </Alert>}
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
                            }} >
                        <div id="editBox" onClick={(e)=>{e.stopPropagation()}} style={{marginTop:100,width:700,height:450,backgroundColor:"whitesmoke",borderRadius:"5px",padding:10}}>
                            <div style={{height:"10%",display:"flex",justifyContent:"flex-end"}}>
                                <Button onClick={()=>{
                                    this.UnActiveBackDrop()
                                    this.unsetRquireState();
                                    this.CleanInputs();
                                    }}>
                                    <Close fontSize="large" color="error" />
                                </Button>
                            </div>
                            <Grid  container columns={12} sx={{width:"100%",height:"70%"} }>
                                <Grid key="writer" xs={6} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <TextField 
                                    
                                    value={NewBook.info.writer}
                                    onChange={this.OnChangeWriter.bind(this)}
                                    error={NewBook.error.writer}
                                    label="Writer"
                                    id="writer"
                                    type="text"
                                    placeHolder="writer's name"
                                    helperText={ NewBook.error.writer===true?<AlertErr />: NewBook.error.writer===false?<AlertSucc type={"Writer"}/>:<Alert severity="info">Writer's name should be string</Alert>}

                                    />
                                </Grid>
                                <Grid key="title" xs={6} sx={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <TextField 
                                
                                    value={NewBook.info.title}
                                    onChange={this.OnChangeTitle.bind(this)}
                                    error={NewBook.error.title}
                                    label="The Title"
                                    id="title"
                                    type="text"
                                    placeHolder="title of the book"
                                    helperText={ NewBook.error.title===true?<AlertErr />: NewBook.error.title===false?<AlertSucc type={"Title"}/>:<Alert severity="info">Title is required</Alert>}
                                    
                                    />
                                </Grid>
                                <Grid  key="date" xs={12} sx={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <TextField 
                                    value={NewBook.info.date}
                                    onChange={this.OnChangeDate.bind(this)}
                                    error={NewBook.error.date}
                                    type="date"
                                    id="class"
                                    helperText={ NewBook.error.date===true?<AlertErr />: NewBook.error.date===false?<AlertSucc type={"Date"}/>:<Alert severity="info">Date is required</Alert>}
                                    />
                                </Grid>
                                
                            </Grid>

                            <div style={{height:"10%",display:"flex",justifyContent:"center",gap:10}}>
                                <Button onClick={this.OnEditeBook.bind(this)} variant="contained" color="info">
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