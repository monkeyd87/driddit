
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Root(){


  
    return(
    <>
        <NavBar/>
        <div>
            <Outlet/>
        </div>
    </>)
}

export default Root