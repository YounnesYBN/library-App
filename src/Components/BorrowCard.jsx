import { Component } from "react";
import { CardHeader,Card, Typography,CardContent,CircularProgress,Alert,Divider, IconButton ,Chip } from '@mui/material';
import $ from "jquery";
import { DataGrid } from '@mui/x-data-grid';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';






function Loading(){ return <CircularProgress size="small" sx={{color:"black"}}/>}
function Error(){return <Alert severity="error" sx={{maxWidth:"fit-content",margin:0}}>somthing went wrong</Alert>}


export default class BorrowCard extends Component{
    
    constructor(props){
        super(props)
        this.state={
            borrow : {num:{number:0,loding:false,error:false},table:{error:false,loding:false,info:[]}},

        }
        
    }

    GetBorrowNumber(){
        $.ajax({
            type : "GET",
            url : "http://localhost/my-projects/my-app/PHP/controle/emprunt handler/GetEmpruntNumHandler.php",
            data : {"GetNum":"true"},
            dataType : "JSON",
            success : (result)=>{
                var Err = result.err
                if(Err == false){
                    this.setState({
                        borrow : {num:{number:this.state.borrow.num.number+result.number,loding:false,error:false},table:this.state.borrow.table}
                    })
                    console.log("borr done")
                }else{
                    console.log("else")
                    this.setState({
                        borrow : {num:{number:0,loding:false,error:true},table:this.state.borrow.table}
                    })
                }
            },
            error : (result)=>{
                console.log("else")
                this.setState({
                    borrow : {num:{number:0,loding:false,error:true},table:this.state.borrow.table}
                })
            },
            beforeSend:()=>{
                this.setState({
                    borrow : {num:{number:this.state.borrow.number,loding:true,error:this.state.borrow.error},table:this.state.borrow.table}
                })
            }
        })
    }

    GetBorrowInfo(){
        $.ajax({
            type:"GET",
            url : "http://localhost/my-projects/my-app/PHP/controle/emprunt handler/listEmprunt_Handler.php",
            data : {"GetInfo":"true"},
            dataType : "JSON",
            success : (result)=>{
                var err = result.err
                
                if(err==false){
                    var PhpInfo = result.info 
                    this.setState({
                        borrow : {num:this.state.borrow.num,table:{error:false,loding:false,info:this.state.borrow.table.info.concat(PhpInfo)}}
                    })
                    
                }else{
                    this.setState({
                        borrow : {num:this.state.borrow.num,table:{error:true,loding:false,info:[]}}
                    })
                }

                
            },
            error : (result)=>{
                this.setState({
                    borrow : {num:this.state.borrow.num,table:{error:true,loding:false,info:[]}}
                })
                
            },
            beforeSend : ()=>{
                this.setState({
                    borrow : {num:this.state.borrow.num,table:{error:false,loding:true,info:[]}}
                })
            }
            

        })
    }
    

    componentDidMount(){
        if(this.state.borrow.table.info.length==0){

            this.GetBorrowNumber()
            this.GetBorrowInfo()
        }
    }

    render(){
        const {borrow}  = this.state;
        

        const columns = [
            { field: 'id',
              headerName: 'ID',
            //   width: 100,
              sortable: true,

            },
            {
              field: 'name',
              headerName: 'Name',
            //   width: 100,
              sortable: true
              
            },
            {
              field: 'family_name',
              headerName: 'Family name',
            //   width: 100,
              sortable: true
              
            },
            {
              field: 'title',
              headerName: 'Title',
            //   width: 100,
              sortable: true
              
            },

            {
              field: 'writer',
              headerName: 'Writer',
            //   width: 100,
              sortable: true
                
            },
            {
                field: 'date',
                headerName: 'Date',
                type : "date",
                // width: 100,
                sortable: true
                  
              }
            
          ];
          
        
        return(
            <Card id="card" sx={{height:600}} variant="outlined" >   
                <CardHeader
                    
                    sx={{height:"20%"}}
                    title={<Typography id="title" variant="h3" sx={{display:"flex","gap":38,color:"#547CB8"}} color="initial">BORROW <IconButton id="icon" color="primary" ><LibraryAddIcon  sx={{fontSize:50}} /></IconButton> </Typography>}
                    subheader={<Typography id="totale" variant="h5" color="GrayText"     >Totale : {borrow.num.loding===true?<Loading />:borrow.num.error===true?<Error />:borrow.num.number}</Typography>}

                />
                <Divider ><Chip label="TABLE" variant="filled" color="primary" /></Divider>
                <CardContent sx={{height:"80%"}}>
                    {borrow.table.loding===true?<Loading />:borrow.table.error===true?<Error />:<DataGrid sx={{height:"100%"}} rows={borrow.table.info}  columns={columns} pageSize={5} rowsPerPageOptions={[5]} autoHeight />}
                </CardContent>
            </Card>
        )
        
        
    }

    

}