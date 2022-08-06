import { Component } from "react"
import { Box ,IconButton, Drawer, AppBar, Toolbar, Avatar, Button,Tooltip,Typography} from "@material-ui/core"
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AppMenu from "./AppMenu";
import HomeIcon from '@mui/icons-material/Home';








export default class BarOfApp extends Component{

    constructor(props){
        super(props)
        this.state={
            drawerOpen : false
        }



    }

    GetRandom(Array){
        var len = Array.length
        var index = Math.floor(Math.random()*len)
        return Array[index]
    }

    render(){
        const{StudentOption,BackHome,BookOption} = this.props
        const shourtCutName =this.props.Name[0]+this.props.Name[1]
        return(
            <Box sx={{ flexGrow: 1 }}>
                <AppBar  position="fixed" style={{backgroundColor:"#547CB8"}}>
                
                  <Toolbar  style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{display:"flex",gap:20}}>
                        <Button variant="outlined" onClick={()=>this.setState({drawerOpen:true})}>
                            <MenuIcon fontSize="large" sx={{color:"black"}}/>
                        </Button>
                        <Button variant="contained"   onClick={()=>{BackHome()}}>
                            <HomeIcon  color="secondary" fontSize="large" sx={{}}/>
                    </Button>
                    </div>
                    
                    <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:10}}>
                        <h1 style={{fontFamily:"'Edu TAS Beginner', cursive",color:"#F8F4E3",textShadow:"0px 0px 4px black"}}>Welcom</h1>
                        <h1 style={{fontFamily:"'Edu TAS Beginner', cursive",color:"#F8F4E3",textShadow:"0px 0px 4px black"}}>{this.props.Name}</h1>
                    </div>
                    <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:30}}>
                        <Avatar style={{backgroundColor:"black"}}>{shourtCutName}</Avatar>
                        <Tooltip title="log out" placement="bottom" arrow >
                            <Button variant="contained" onClick={this.props.LogOutHandler} >
                              <LogoutIcon color="error" fontSize="small" />
                            </Button>
                        </Tooltip>
                    </div>
                  </Toolbar>
                </AppBar>
                <Drawer
                    
                    id="drower"
                    anchor="left"
                    open = {this.state.drawerOpen}
                    onClose={()=>this.setState({drawerOpen:false})}
                    

                >
                    <AppMenu StudentOption={StudentOption}  BookOption={BookOption}/>      
                </Drawer>
            </Box>
        )


    }

}