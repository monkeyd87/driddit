
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function Root(){


  
    return(
   
        <Container fluid className="bg-black  d-flex justify-content-center">
            <NavBar/>
            <Outlet/>
        </Container>
   )
}

export default Root