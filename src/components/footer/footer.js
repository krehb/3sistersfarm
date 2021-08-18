import React from 'react';
import { Container, Col, Row, ListGroup} from 'react-bootstrap';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer mt-auto py-3">



            <div className='footer-items'>



                <br></br>

                <div  className='item-social' ><span className="text-muted">Contact Us</span></div>

                <div className='item'><span className="text-muted">Contact us @ 3sistersfarmiowa@gmail.com </span></div>
                <div className='item' > 
                    <Link className='link' to='/admin' >
                        <FontAwesomeIcon icon={faUserLock} />
                    </Link>
                </div>
                <div className='item'><span className="text-muted">Website devopled by <a target="_blank" href="https://www.inputllc.net/">input llc</a></span></div>
            </div>
        </footer>
    )
}

export default Footer;