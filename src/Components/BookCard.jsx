import { Component } from "react";
import { CardHeader,Card, Typography,CardContent,CircularProgress,Alert,Divider, IconButton ,Chip } from '@mui/material';
import $ from "jquery";
import { DataGrid } from '@mui/x-data-grid';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';






function Loading(){ return <CircularProgress size="small" sx={{color:"black"}}/>}
function Error(){return <Alert severity="error" sx={{maxWidth:"fit-content",margin:0}}>somthing went wrong</Alert>}


export default class BookCard extends Component{
    
    constructor(props){
        super(props)
        this.state={
            book : {num:{number:0,loding:false,error:false},table:{error:false,loding:false,info:[]}},

        }
    }

    GetBookNumber(){
        $.ajax({
            type : "GET",
            url : "http://localhost/my-projects/library-App/PHP/controle/books handler/GetBookNumHnadler.php",
            data : {"GetNum":"true"},
            dataType : "JSON",
            success : (result)=>{
                var Err = result.err
                if(Err == false){
                    this.setState({
                        book : {num:{number:this.state.book.num.number + result.number,loding:false,error:false},table:this.state.book.table}
                    })
                    console.log("book done")

                }else{
                    console.log("else")
                    this.setState({
                        book : {num:{number:0,loding:false,error:true},table:this.state.book.table}
                    })
                }
            },
            error : (result)=>{
                console.log("else")
                this.setState({
                    book : {num:{number:0,loding:false,error:true},table:this.state.book.table}
                })
            },
            beforeSend:()=>{
                this.setState({
                    book : {num:{number:this.state.book.number,loding:true,error:this.state.book.error},table:this.state.book.table}
                })
            }
        })
    }

    GetBookInfo(){
        $.ajax({
            type:"GET",
            url : "http://localhost/my-projects/library-App/PHP/controle/books handler/listLhandler.php",
            data : {"GetInfo":"true"},
            dataType : "JSON",
            success : (result)=>{
                var err = result.err
                
                if(err==false){
                    var PhpInfo = result.info 
                    this.setState({
                        book : {num:this.state.book.num,table:{error:false,loding:false,info:this.state.book.table.info.concat(PhpInfo)}}
                    })
                    
                }else{
                    this.setState({
                        book : {num:this.state.book.num,table:{error:true,loding:false,info:[]}}
                    })
                }

                
            },
            error : (result)=>{
                this.setState({
                    book : {num:this.state.book.num,table:{error:true,loding:false,info:[]}}
                })
                
            },
            beforeSend : ()=>{
                this.setState({
                    book : {num:this.state.book.num,table:{error:false,loding:true,info:[]}}
                })
            }
            

        })
    }
    componentDidMount(){
        if(this.state.book.table.info.length==0){
            
            this.GetBookNumber()
            this.GetBookInfo()
        }
    }

    Table(){
        
        
    }

    render(){
        const {book}  = this.state;

        const columns = [
            { field: 'id',
              headerName: 'ID',
              width: 90,
              sortable: true,

            },
            {
              field: 'title',
              headerName: 'Title',
              width: 150,
              
            },
            {
              field: 'writer',
              headerName: 'Writer',
              width: 150,
              sortable: true
              
            },
            {
              field: 'date',
              headerName: 'Date',
              type: 'date',
              width: 110,
              sortable: true
              
            }
            
          ];
          
        
        return(
            <Card  id="card" sx={{height:600}} variant="outlined" >   
                <CardHeader 
                    sx={{height:"20%"}}
                    title={<Typography id="title" variant="h3" sx={{display:"flex","gap":30,color:"#547CB8"}} color="initial">BOOKS <IconButton id="icon"color="primary" ><MenuBookTwoToneIcon  sx={{fontSize:50}} /></IconButton> </Typography>}
                    subheader={<Typography id="totale" variant="h5" color="GrayText"     >Totale : {book.num.loding===true?<Loading />:book.num.error===true?<Error />:book.num.number}</Typography>}

                />
                <Divider ><Chip label="TABLE" variant="filled" color="primary" /></Divider>
                <CardContent sx={{height:"80%"}}>
                    {book.table.loding===true?<Loading />:book.table.error===true?<Error />:<DataGrid sx={{height:"100%"}} rows={book.table.info}  columns={columns}  pageSize={5} rowsPerPageOptions={[5]} autoHeight   />}
                </CardContent>
                
            </Card> 

        )
        
    }

}