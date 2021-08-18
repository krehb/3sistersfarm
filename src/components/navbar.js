import React from 'react'
import { Nav, Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import Logo from '../pics/logo.png'

export default function navbar({executeScroll, cart}) {


    const linkStyling = {
        color: '#5d5d5e',
        fontWeight: 600,
        hover: {
            color: "red"
        },
    }


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand >
                        <Link to='/' >
                        <img
                        src={Logo}
                        width="40"
                        height="35"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                        />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand ><Link className='link' style={linkStyling} to='/' >Three Sisters' Farm </Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=> {setTimeout(function(){window.scroll(0, 2000)}, 100);}} >
                            <Link style={linkStyling} className='link' to="/" >About</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link style={linkStyling} className='link' to="/" >Buy</Link>
                        </Nav.Link>
                        <Nav.Link onClick={executeScroll} >
                            <Link style={linkStyling} className='link' to="/" ><FontAwesomeIcon  icon={faMapMarkedAlt} /></Link>
                        </Nav.Link>
                        {cart.length > 0 &&
                            <Nav.Link className='link' >
                                <Link style={linkStyling} className='link' to='/cart' >
                                ({cart.length})<FontAwesomeIcon  icon={faShoppingBasket} />
                                </Link>
                            </Nav.Link>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
