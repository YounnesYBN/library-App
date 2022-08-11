import { Component } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button,Select,FormControl,MenuItem,InputLabel, TextField ,FormHelperText} from "@material-ui/core";
import { Alert } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import BookIcon from '@mui/icons-material/Book';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import $ from "jquery";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';



function Loading(){
    
    return <div id="center-ele" style={{width:"100%",height:"100%"}}><CircularProgress size={50} color="error" /></div>
    
}


export default class AddBorrowHandler extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            value : {name:"",Fname:"",title:"",writer:"",date:""},
            err : {students:null,book:null,date:null},
            SelectStudentValue : null,
            SelectBookValue : null,
            AllStudent : [],
            AllBook : [],
            
            
        }
    }

    
    GetAllStudent(){
        $.ajax({
                type:"GET",
                url:"http://localhost/my-projects/library-App/PHP/controle/students%20handler/listEhandler.php",
                data:{"GetInfo":"true"},
                dataType:"JSON",
                success : (respond)=>{
                    
                    var sqlErr = respond.err
                    var lenArray = this.state.AllStudent.length
                    
                    if(sqlErr==false){
                        this.setState({AllStudent: lenArray==0?this.state.AllStudent.concat(respond.info):this.state.AllStudent.concat([])})
                    }else{
                        this.setState({AllStudent:[]})
                    }
                    
                },
                erorr : (respond)=>{
                    
                    this.setState({AllStudent : []}) 
                }
                

            })
            
        }
        GetAllBooks(){
            $.ajax({
                type : "GET",
                url : "http://localhost/my-projects/library-App/PHP/controle/books%20handler/listLhandler.php",
                data : {"GetInfo":"true"},
                dataType :"JSON",
                success : (respond)=>{
                    
                    var sqlErr = respond.err
                    var lenArray = this.state.AllBook.length
                    
                    if(sqlErr==false){
                        this.setState({AllBook: lenArray==0?this.state.AllBook.concat(respond.info):this.state.AllBook.concat([])})
                    }else{
                        this.setState({AllBook: [] })
                    }
                    
                },
                erorr : (respond)=>{
                    
                    this.setState({AllBook : []}) 
                }
    
            })
        }
        
    OnSelectStudentChange(e){
        const {value,err} = this.state
        var SelectValue = e.target.value
        var Name = this.state.AllStudent[SelectValue].name
        var Fname = this.state.AllStudent[SelectValue].family_name
        // var fullName = Name+" "+Fname
        this.setState({
            value : {name:Name,Fname:Fname,title:value.title,writer:value.writer,date:value.date},
            err : {students:false,book:err.book,date:err.date},
            SelectStudentValue : SelectValue
        })
        
        
    }
    OnSelectBookChange(e){
        const {value,err} = this.state
        var SelectValue = e.target.value
        var title = this.state.AllBook[SelectValue].title
        var writer = this.state.AllBook[SelectValue].writer
        // var fullName = Name+" "+Fname
        this.setState({
            value : {name:value.name,Fname:value.Fname,title:title,writer:writer,date:value.date},
            err : {students:err.students,book:false,date:err.date},
            SelectBookValue:SelectValue
        })
        
        
    }
    OnChangeDate(e){
        const {value,err} = this.state
        var ValueDate = e.target.value
        var testLen = ValueDate.length>0

        this.setState({
            value : {name:value.name,Fname:value.Fname,title:value.title,writer:value.writer,date:ValueDate},
            err : {students:err.students,book:err.book,date:testLen==true?false:true},
        })
        
        
    }

    clean(){

        this.setState({
            value : {name:"",Fname:"",title:"",writer:"",date:""},
            err : {students:null,book:null,date:null},
            SelectStudentValue : "",
            SelectBookValue : "",
        })
    }

    addBorrow(){
        const {closeBD,openSB,SetTypeErr,SetTypeSuc} = this.props
        const {err} = this.state
        const studentErr = err.students
        const bookErr = err.book
        const dateErr = err.date

        if(studentErr==false&&bookErr==false&&dateErr==false){
            
            const {value} = this.state

            $.ajax({
                type:"POST",
                url:"http://localhost/my-projects/library-App/PHP/controle/emprunt%20handler/empruntLivre_action.php",
                data : {"AddBorrow":"true","name":value.name,"Fname":value.Fname,"title":value.title,"writer":value.writer,"date":value.date},
                dataType:"JSON",
                success:(respond)=>{
                    
                    if(respond.userErr==true){
                        this.clean();
                        closeBD();
                        this.setState({
                            loading : false
                        })
                        openSB()
                        SetTypeErr()
                    }else{
                        this.clean();
                        closeBD();
                        this.setState({
                            loading : false
                        })
                        openSB()
                        SetTypeSuc()
                        
                    }
                },
                
                beforeSend : ()=>{
                    this.setState({
                        loading : true
                    })
                }
        })


        }else{
            this.setState({

                err : {students:studentErr==false?false:true,book:bookErr==false?false:true,date:dateErr==false?false:true}

            })
        }

    }
    
        
        
    componentDidMount(){
        this.GetAllStudent()
        this.GetAllBooks()
    }

    render(){
        const {closeBD,openSB,SetMessage} = this.props
        const {err} = this.state
        return(
            <div style={{marginTop:100,width:"70%",height:400,borderRadius:5,backgroundColor:"white"}}>
                <div style={{width:"100%",display:"flex",justifyContent:"flex-end",height:"10%",backgroundColor:"black",borderRadius:"5px 5px 0 0"}}>
                    <IconButton  onClick={
                        (e)=>{
                            closeBD()
                            e.stopPropagation()
                        }
                    }>
                      <CloseIcon color="error" fontSize="large"/>
                    </IconButton>
                </div>

                {this.state.loading==false?
                (
                <div style={{width:"100%",height:"90%",display:"flex",flexWrap:"wrap"}}>
                    <div style={{width:"50%",display:"flex",justifyContent:"center",alignItems:"center",direction:"column"}}>
                        <FormControl style={{width:"80%",margin:10}}>
                            <InputLabel id="student" >STUDENTS</InputLabel>
                            <Select
                              onChange={this.OnSelectStudentChange.bind(this)}
                              labelId="student"
                              id="Students-Select"
                              label="student"
                              variant="standard"
                              color="secondary"
                              value={this.state.SelectStudentValue}
                              error={err.students}
                            >
                                <MenuItem value={null} disabled>{this.state.AllStudent.length==0?"there is no students to select":"studens :"}</MenuItem>
                                {
                                this.state.AllStudent.map((obj,index)=>{
                                    var id = obj.id
                                    var name = obj.name
                                    var Fname = obj.family_name
                                    return(
                                        <MenuItem 
                                        id = {index}
                                        key = {id}
                                        value = {index}
                                        >
                                        <PersonPinIcon fontSize="small" color="info" style={{marginRight:4}} /> 

                                        {name+" "+Fname}
                                        </MenuItem>
                                    )
                                })
                                }
                            </Select>
                            <FormHelperText >{err.students==false?<Alert style={{textAlign:"center"}} severity="success" >Good</Alert>:err.students==true?<Alert severity="error" >you need to select</Alert>:""}</FormHelperText>
                            
                        </FormControl>
                    </div>

                    <div style={{width:"50%",display:"flex",justifyContent:"center",alignItems:"center",direction:"column"}}>
                        <FormControl style={{width:"80%",margin:10}}>
                            <InputLabel id="book" >BOOKS</InputLabel>
                            <Select
                              labelId="book"
                              id="Book-Select"
                              label="BOOKS"
                              variant="standard"
                              color="secondary"
                              value={this.state.SelectBookValue}
                              error={err.book}
                              onChange={this.OnSelectBookChange.bind(this)}
                            >
                                <MenuItem value={null} disabled>{this.state.AllBook.length==0?"there is no Books to select":"Books :"}</MenuItem>
                                {
                                    this.state.AllBook.map((obj,index)=>{
                                        var id = obj.id
                                        var title = obj.title
                                        var writer = obj.writer
                                        return(
                                            <MenuItem 
                                            id = {index}
                                            key = {id}
                                            value = {index}
                                            >
                                            <BookIcon fontSize="small" color="info" style={{marginRight:4}} /> 

                                            {title}
                                            <PersonOutlineIcon fontSize="small" color="info" style={{margin:"0px 10px 0px 4px"}}/> 

                                             {writer}
                                            </MenuItem>
                                        )
                                    })
                                }
                                
                            </Select>
                            <FormHelperText >{err.book==false?<Alert severity="success" style={{textAlign:"center"}} >Good</Alert>:err.book==true?<Alert severity="error" >you need to select</Alert>:""}</FormHelperText>
                        </FormControl>

                    </div>

                    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <TextField
                          id="date"
                          value={this.state.value.date}
                          variant="outlined"
                          color="secondary"
                          type="date"
                          error={err.date}
                          onChange={this.OnChangeDate.bind(this)}
                          helperText={err.date==false?<Alert severity="success" style={{textAlign:"center"}} >Good</Alert>:err.date==true?<Alert severity="error" >enter a date pleas</Alert>:""}
                        />
                    </div>

                    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",gap:20}}>
                        <Button variant="contained"  color="primary" onClick={this.addBorrow.bind(this)}>
                            <LibraryAddOutlinedIcon fontSize="large"  />
                        </Button>
                        <Button onClick={this.clean.bind(this)} variant="outlined" color="secondary">
                            <CleaningServicesTwoToneIcon  color="secondary" fontSize="large"/>
                        </Button>
                    </div>
                    
                </div>
            ):<Loading />
            }
            </div>
            
        )
    }

}