import { Component } from "react";
import Like from "./../icons/like.png"
import Dislike from "./../icons/dislike.png"
import { Button ,ButtonGroup} from "@mui/material";



export default class Question extends Component{
    constructor(props){

        super(props)

    }

    render(){

        const {Yes,No} = this.props
        return(

            <div style={{width:300,height:200,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h3 style={{width:300,textAlign:"center"}}>Do you have an <strong><em>account?</em></strong></h3>
                <ButtonGroup variant="contained" aria-label="outlined sacondary button group">
                    <Button onClick={Yes} color="success">Yes <img src={Like} alt="" width={30} /></Button>
                    <Button onClick={No} color="secondary">No <img src={Dislike} alt="" width={30}/></Button>
                </ButtonGroup>

            </div>

        )

    }
}