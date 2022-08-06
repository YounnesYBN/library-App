import { Component } from "react";
import { CardHeader,Card, Typography,CardContent,CircularProgress,Alert,Divider, IconButton ,Chip } from '@mui/material';
import $ from "jquery";
import { DataGrid } from '@mui/x-data-grid';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';






function Loading(){ return <CircularProgress size="small" sx={{color:"black"}}/>}
function Error(){return <Alert severity="error" sx={{maxWidth:"fit-content",margin:0}}>somthing went wrong</Alert>}


export default class StudentCard extends Component{
    
    constructor(props){
        super(props)
        this.state={
            student : {num:{number:0,loding:false,error:false},table:{error:false,loding:false,info:[]}},

        }
    }

    GetStudentNumber(){
        $.ajax({
            type : "GET",
            url : "http://localhost/my-projects/my-app/PHP/controle/students handler/GetStudentNumHnadler.php",
            data : {"GetNum":"true"},
            dataType : "JSON",
            success : (result)=>{
                var Err = result.err
                if(Err == false){
                    this.setState({
                        student : {num:{number:this.state.student.num.number+result.number,loding:false,error:false},table:this.state.student.table}
                    })
                    console.log("stu done")
                }else{
                    console.log("else")
                    this.setState({
                        student : {num:{number:0,loding:false,error:true},table:this.state.student.table}
                    })
                }
            },
            error : (result)=>{
                console.log("else")
                this.setState({
                    student : {num:{number:0,loding:false,error:true},table:this.state.student.table}
                })
            },
            beforeSend:()=>{
                this.setState({
                    student : {num:{number:this.state.student.number,loding:true,error:this.state.student.error},table:this.state.student.table}
                })
            }
        })
    }

    GetStudentInfo(){
        $.ajax({
            type:"GET",
            url : "http://localhost/my-projects/my-app/PHP/controle/students handler/listEhandler.php",
            data : {"GetInfo":"true"},
            dataType : "JSON",
            success : (result)=>{
                var err = result.err
                
                if(err==false){
                    var PhpInfo = result.info 
                    this.setState({
                        student : {num:this.state.student.num,table:{error:false,loding:false,info:this.state.student.table.info.concat(PhpInfo)}}
                    })
                    
                }else{
                    this.setState({
                        student : {num:this.state.student.num,table:{error:true,loding:false,info:[]}}
                    })
                }

                
            },
            error : (result)=>{
                this.setState({
                    student : {num:this.state.student.num,table:{error:true,loding:false,info:[]}}
                })
                
            },
            beforeSend : ()=>{
                this.setState({
                    student : {num:this.state.student.num,table:{error:false,loding:true,info:[]}}
                })
            }
            

        })
    }
    componentDidMount(){
        if(this.state.student.table.info.length==0){
            
            this.GetStudentNumber()
            this.GetStudentInfo()
        }
    }

    

    render(){
        const {student}  = this.state;

        const columns = [
            { field: 'id',
              headerName: 'ID',
              width: 100,
              sortable: true,

            },
            {
              field: 'name',
              headerName: 'Name',
              width: 100,
              
            },
            {
              field: 'family_name',
              headerName: 'Family name',
              width: 100,
              sortable: true
              
            },
            {
              field: 'adress',
              headerName: 'Adress',
              width: 100,
              sortable: false
              
            },

            {
              field: 'class',
              headerName: 'Class',
              width: 100,
              sortable: false
                
            }
            
          ];
          
        
        return(
            <Card id="card" sx={{height:600}} variant="outlined" >   
                <CardHeader
                    
                    sx={{height:"20%"}}
                    title={<Typography id="title" variant="h3" sx={{display:"flex","gap":20,color:"#547CB8"}} color="initial">STUDENTS <IconButton id="icon" color="primary" ><SupervisedUserCircleIcon  sx={{fontSize:50}} /></IconButton> </Typography>}
                    subheader={<Typography id="totale" variant="h5" color="GrayText"     >Totale : {student.num.loding===true?<Loading />:student.num.error===true?<Error />:student.num.number}</Typography>}

                />
                <Divider ><Chip label="TABLE" variant="filled" color="primary" /></Divider>
                <CardContent sx={{height:"80%"}}>
                    {student.table.loding===true?<Loading />:student.table.error===true?<Error />:<DataGrid sx={{height:"100%"}} rows={student.table.info}  columns={columns}  pageSize={5}   rowsPerPageOptions={[5]}  autoHeight />}
                </CardContent>
                
            </Card> 

        )
        
    }

}