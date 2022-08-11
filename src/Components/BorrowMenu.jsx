import { Component } from "react"
import { ListItemButton,ListItemIcon } from "@mui/material";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';




export default class BorrowMenu extends Component{

    constructor(props){
        super(props)
    }

    render(){
        const{BorrowOption}=this.props
        return(
            <div>
                <ListItemButton  onClick={()=>{BorrowOption.add()}} sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>Order managment</h4>
                    <ListItemIcon>
                        <SettingsRoundedIcon fontSize="large" color="secondary" />
                    </ListItemIcon>
                </ListItemButton >
            </div>
        )
    }
}