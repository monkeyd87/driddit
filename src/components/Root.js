
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import {useState,createContext} from 'react'
import nsfwContext from '../hooks'

function Root(){

    const [isNSFW,setIsNSFW] = useState(false)

  
    return(
        <>
        <nsfwContext.Provider value={[isNSFW,setIsNSFW]}>
            <NavBar/>
            <Container  className="bg-black  d-flex justify-content-center">
                <Outlet context={isNSFW}/>
            </Container>

        </nsfwContext.Provider>
        </>
   )
}

export default Root