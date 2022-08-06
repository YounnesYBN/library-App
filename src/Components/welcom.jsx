import { Card, CardHeader,CardContent,Divider} from "@mui/material";


import Hi from "./../icons/Hi.png"



function Welcom(){
   
    return(
        <div>
            <Card id="welcom" sx={{width : 520}}>
                <CardHeader
                  title={<h1 style={{color:"purple",textShadow:"1px 1px 3px gray"}}>Hi,and Welcom <img alt=" " width={48} src={Hi}/></h1>}
                  subheader=""
                />
                <Divider ></Divider>
                
               <CardContent>
                    <p>
                        <strong>Join Me </strong> 
                         to my first APP where you can <em style={{color:"lightblue"}}> Store </em> all the <span style={{fontFamily:"'Pacifico', cursive",color:"gray",fontSize:20}}>Students</span> and <span style={{fontFamily:"'Dancing Script', cursive",color:"pink",fontSize:30}}>Books</span>. <br />
                         Also you Will be able to manage your <span style={{fontFamily:"'Edu TAS Beginner', cursive",color:"gray",fontSize:20}}>Libraby</span> 
                    </p>
               </CardContent>
            </Card>
        </div>
    )
}

export default Welcom;