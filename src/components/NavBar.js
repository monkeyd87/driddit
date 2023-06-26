import {Navbar,Nav,Button,Container,Form,NavDropdown,OverlayTrigger, Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faCake,faHouse,faVideo,faCompass,faStore,faFaceSmileWink,faBolt,faUser,faPencil,faD } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'


function NavBar({title,url,onSubmit}){
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const [logoState, setLogoState] =useState(true)

  const submitHandler = event =>{
    event.preventDefault()
    navigate(`/search/${query}`)
    setQuery('')
    

    
  }
    return (
        <Navbar className='fixed-top border-bottom border-dark ' bg="black" expand="sm">
            <NavLink to='/'>
              <Navbar.Brand  onMouseOut={()=>{setLogoState(true)}} onMouseOver={()=>{setLogoState(false)}} className='text-light text-center '>{logoState ?<img src='https://w7.pngwing.com/pngs/487/46/png-transparent-logo-black-and-white-brand-letter-d-white-text-rectangle.png' style={{height:'65px',width:'65px',padding:'0',filter:'invert(1)'}} />:<img src='https://media.giphy.com/media/1SG7c0JfRvZwWzO1XC/giphy.gif' style={{height:'65px',width:'65px',padding:'0'}}/>}</Navbar.Brand>

            </NavLink>
            <Navbar.Toggle className='bg-light' aria-controls="navbarScroll" />
            <Navbar.Collapse className='' id="navbarScroll">
            <Form className="d-flex w-100 " onSubmit={submitHandler}>
              <Form.Control
                onChange={(event)=>setQuery(event.target.value)}
                type="text"
                placeholder="Search"
                className=" "
                aria-label="Search"
                value={query}
              />
            </Form>
            <Nav className='brder justify-content-between  m-3' style={{width:'65%'}}>
              <NavLink to="/" className={({isActive,isPending})=> isActive ? "text-light" : "text-dark"}>
               <FontAwesomeIcon size='xl' className='' icon={faHouse}/>
              </NavLink>

              <NavLink to="live" className={({isActive,isPending})=>  isActive ? "text-light" : "text-dark"}>
                <FontAwesomeIcon size='xl' className=''  icon={faVideo}/>
              </NavLink>

              <FontAwesomeIcon size='xl' className='text-dark' icon={faCompass}/>

              <OverlayTrigger 
                placement='bottom'
                overlay={<Card className='bg-dark text-light'style={{zIndex:"1000000",top:"1000px",position:'absolute'}}>
                  <Card.Header className=''>testing</Card.Header>
                  <Card.Img src='https://media.giphy.com/media/LWk25R6XgfuSpY0xv4/giphy.gif'/>
                  <Card.Body>hello</Card.Body>
                </Card>}
              
              >
                <FontAwesomeIcon size='xl' className='text-dark' icon={faStore}/>
              </OverlayTrigger>
              <FontAwesomeIcon size='xl' className='text-dark' icon={faEnvelope}/>
              <FontAwesomeIcon size='xl' className='text-dark' icon={faFaceSmileWink}/>
              <FontAwesomeIcon size='xl' className='text-dark' icon={faBolt}/>
              <FontAwesomeIcon size='xl' className='text-dark' icon={faUser}/>
              <Button variant='primary'>
                <FontAwesomeIcon size='xl' className='text-dark' icon={faPencil}/>
              </Button>
            </Nav>
            </Navbar.Collapse>
          
        </Navbar>
      );
    }

export default NavBar