import { Component } from "react"
import { ListItemButton,ListItemIcon } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';



export default class BookMenu extends Component{

    constructor(props){
        super(props)
    }

    

    render(){
        const {BookOption} = this.props
        return(
            <div>
                <ListItemButton onClick={()=>{BookOption.add()}}  sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>Add Book</h4>
                    <ListItemIcon>
                        <PostAddIcon fontSize="large" color="secondary" />
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={()=>{BookOption.delete()}} sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>Delete Book</h4>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="large" color="secondary" />
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={()=>{BookOption.edite()}} sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>edite Book</h4>
                    <ListItemIcon>
                        <EditIcon fontSize="large" color="secondary" />
                    </ListItemIcon>
                </ListItemButton>
            </div>
        )
    }
}