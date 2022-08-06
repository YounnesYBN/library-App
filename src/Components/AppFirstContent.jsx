import { Component } from "react";
import { Box } from "@mui/material";
import BookCard from "./BookCard";
import StudentCard from "./StudentCard";
import BorrowCard from "./BorrowCard";
 


export default class FirstContent extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return (
            <Box sx={{flexGrow:1 ,flexWrap:"wrap",display:"flex" ,padding:3,justifyContent:"center",gap:10,marginTop:10}}>
                <div style={{width:"45%"}}>
                    <BookCard />
                </div>
                    
                <div style={{width:"45%"}}>
                    <StudentCard />
                </div>
                <div style={{width:"55%"}}>
                    <BorrowCard />
                </div>
            </Box>
        )
    }

}