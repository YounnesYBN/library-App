import { Component } from "react";
import BorrowCard from "./BorrowCard"
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Backdrop, Snackbar, IconButton, Alert } from "@mui/material";
import AddBorrowHandler from "./AddBorrowHandler";
import { Close } from '@mui/icons-material'






export default class AddBorrow extends Component{

    constructor(props){
        
        super(props)

        this.state={
            addBD : false,
            deleteBD:false,
            SnakeBar:{open:false,type:""}
        }

    }

    colosAddBD(){
        console.log("close")
        this.setState({
            addBD:false
        })
    }

    OpenSnakeBare(){
        this.setState({
            SnakeBar:{open:true,type:this.state.SnakeBar.type}
        })
    }

    SetSnakeBareTypeToErr(){
        this.setState({
            SnakeBar:{open:true,type:"error"}
        })
        

        

    }
    SetSnakeBareTypeToSuc(){
        this.setState({
            SnakeBar:{open:true,type:"success"}
        })
        
    }


    render(){
        return(
            <div   style={{display:"flex",paddingTop:100,flexGrow:1,width:"100%",height:700,gap:15}}>
                <div style={{width:"50%",margin:"20px 0px 0px 30px"} }>
                    <BorrowCard />
                </div>
                <div style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", gap:30}}>
{/* //////////////////////////////////////////////////add////////////////////////////////// */}
                    
                    <Tooltip placement="top" title={<p  style={{textAlign:"center"}}>Add a borrow by selecting the <em color="blue"> student</em> and the <em color="blue">name</em> of the book <br /> and also provide the date</p> } arrow>
                        <Button onClick={()=>{this.setState({addBD:true})}} variant="contained" color="primary" style={{width:200,gap:20,height:50}}>
                             <Typography variant="h6"  >ADD</Typography> <AddIcon fontSize="large"  /> 
                        </Button>
                    </Tooltip>
{/* //////////////////////////////////////////////////delete////////////////////////////////// */}
                    <Tooltip  placement="bottom" title={<p  style={{textAlign:"center"}}>delete a borrow by selecting wish <em color="green">borrow</em> you want</p> } arrow>
                        <Button variant="outlined" color="error" style={{width:200,gap:20,height:50}}>
                            <Typography variant="h6" color="lightred">REMOVE</Typography>  <DeleteForeverIcon fontSize="large" color="error" /> 
                        </Button>
                    </Tooltip>
                </div>

                <Backdrop invisible={false} style={{zIndex:1}} open={this.state.addBD} onClick={()=>{this.setState({addBD:true})}}>
                        <AddBorrowHandler closeBD={this.colosAddBD.bind(this)} openSB={this.OpenSnakeBare.bind(this)} SetTypeErr={this.SetSnakeBareTypeToErr.bind(this)} SetTypeSuc={this.SetSnakeBareTypeToSuc.bind(this)}  />
                </Backdrop>


                <Snackbar
                    style={{width:"fit-content"}}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={this.state.SnakeBar.open}
                  message={this.state.SnakeBar.type=="error"?<Alert severity="error" >this <em color="gray">Order </em> this already exist</Alert>:this.state.SnakeBar.type=="success"?<Alert severity="success" >the <em color="gray">Order</em> is added succefully</Alert>:""}
                  autoHideDuration={5000}
                  action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{
                        this.setState({
                            SnakeBar:{open:false,type:""}
                        })
                    }}>
                      <Close fontSize="small" />
                    </IconButton>
                  }
                />

            </div>
        )
    }
}