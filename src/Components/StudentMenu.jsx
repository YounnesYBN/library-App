import { Component } from "react"
import { ListItemButton,ListItemIcon } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';



export default class StudentMenu extends Component{

    constructor(props){
        super(props)
    }

    render(){

        const{StudentOption} = this.props

        return(
            <div>
                <ListItemButton  onClick={()=>{StudentOption.add()}} sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>Add Student</h4>
                    <ListItemIcon>
                        <PersonAddAlt1Icon fontSize="large" color="secondary" />
                    </ListItemIcon>
                </ListItemButton>

                <ListItemButton onClick={()=>{StudentOption.delete()}} sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>Delete Student</h4>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="large" color="secondary" />
                    </ListItemIcon>
                </ListItemButton>

                <ListItemButton onClick={()=>{StudentOption.edite()}} sx={{gap:6,display:"flex",justifyContent:"center",height:"fit-content"}}>
                    <h4 style={{color:"white",textShadow:"1px 1px 3px gray"}}>edite Student</h4>
                    <ListItemIcon>
                        <EditIcon fontSize="large" color="secondary"  />
                    </ListItemIcon>
                </ListItemButton>
            </div>
        )
    }
}