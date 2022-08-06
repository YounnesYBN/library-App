import { Component } from "react"
import { ListItemButton,ListItemIcon } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';




export default class BorrowMenu extends Component{

    constructor(props){
        super(props)
    }

    render(){

        return(
            <div>
                <ListItemButton  sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>Add Order</h4>
                    <ListItemIcon>
                        <AddToPhotosIcon fontSize="large" color="secondary" />
                    </ListItemIcon>
                </ListItemButton >
            </div>
        )
    }
}