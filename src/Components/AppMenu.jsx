import { Component } from "react";
import { Box, Typography,List,Collapse} from "@material-ui/core";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookMenu from "./BookMenu";
import StudentMenu from "./StudentMenu";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BorrowMenu from "./BorrowMenu";



export default class AppMenu extends Component{

    constructor(props){
        super(props)

        this.state = {
            book:{
                collaps:false
            },
            student :{
                collaps:false
            },
            borrow :{
                collaps:false
            }
        }

    }

    render(){
        const{StudentOption,BookOption,BorrowOption} = this.props
        const {book,student,borrow} = this.state
        return (
            <Box role="presentation" id="drower-box"style={{width:400,height:"100%"}} >

                <Typography variant="h3" style={{margin:"8px 0px 0px 3px",fontFamily:"Lobster, cursive;",height:"20%"}} color="textPrimary"></Typography>

                <List 
                style={{width:"100%",margin:"15px 0px 0px 3px",display:"flex",flexDirection:"column",alignItems:"center"}}
                >

                <ListItemButton id={this.state.book.collaps===false?"blure-button-book":"book-menu-butt"} style={{width:"90%"}} onClick={()=>{this.setState({book:{collaps:!this.state.book.collaps}})}}>
                    <ListItemIcon>
                        <MenuBookTwoToneIcon fontSize="large" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{textShadow:"1px 1px 2.5px gray",color:""}} id="butt-menu-text" variant="h5">Books Options</Typography>} />
                    {book.collaps===false?<ExpandLess />:<ExpandMore />}

                </ListItemButton>
                <Collapse  id="book-menu"  style={{width:"90%"}} in={book.collaps} timeout="auto" >
                    <List style={{width:"100%",margin:"0px 0px 0px 0"}}>
                            <BookMenu  BookOption={BookOption} />
                    </List>
                </Collapse>

                {/* -------------------------------------------- */}

                <ListItemButton  id={this.state.student.collaps===false?"blure-button-book":"book-menu-butt"} style={{width:"90%",marginTop:20}} onClick={()=>{this.setState({student:{collaps:!this.state.student.collaps}})}}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="large" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography id="butt-menu-text" style={{textShadow:"1px 1px 2.5px gray",color:""}} variant="h5">Student Options</Typography>} />
                    {student.collaps===false?<ExpandLess />:<ExpandMore />}

                </ListItemButton>
                <Collapse   id="book-menu"  style={{width:"90%"}} in={student.collaps} timeout="auto" >
                    <List style={{width:"100%",margin:"0px 0px 0px 0"}}>
                            <StudentMenu StudentOption={StudentOption} />
                    </List>
                </Collapse>
                {/* -------------------------------------------- */}
                <ListItemButton  id={this.state.borrow.collaps===false?"blure-button-book":"book-menu-butt"} style={{width:"90%",marginTop:20}} onClick={()=>{this.setState({borrow:{collaps:!this.state.borrow.collaps}})}}>
                    <ListItemIcon>
                        <LocalLibraryIcon fontSize="large" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography id="butt-menu-text" style={{textShadow:"1px 1px 2.5px gray",color:""}} variant="h5">Borrow</Typography>} />
                    {borrow.collaps===false?<ExpandLess />:<ExpandMore />}

                </ListItemButton>
                <Collapse  id="book-menu"  style={{width:"90%"}} in={borrow.collaps} timeout="auto" >
                    <List style={{width:"100%",margin:"0px 0px 0px 0"}}>
                            <BorrowMenu BorrowOption={BorrowOption}/>
                    </List>
                </Collapse>



                </List>
                
                

            </Box>
        )
    }
}