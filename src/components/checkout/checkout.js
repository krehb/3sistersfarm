import React, {useEffect, useState} from 'react'
import Paypal from './Paypal'
import { Table, Container, Button } from 'react-bootstrap';

export default function Checkout({cart, date, time, phone, email, setCart, totalPrice}) {




    return (
        <div>
            <Container>
                <div style={{display: 'flex', justifyContent: 'center'}} >
                    <div style={{width: '400px'}} >
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                            <div>
                            <h2>Confirm & Pay</h2>
                            <ul>
                                {cart.map( item => 
                                    <li>{item.qty} {item.name} for ${item.price*item.qty}.00</li>
                                )}
                                <li>Total: ${totalPrice}.00</li>
                            </ul>
                            <div style={{textAlign: 'center'}} >
                                <h5>Instructions</h5>
                            </div>
                            <div>
                                pick up at {time} on {date}
                            </div>
                            <div>
                                drive to 2589 Ubben Ave, Williams, IA 50271
                            </div>
                            <div style={{textAlign: 'center'}} >
                                <h5>Your Contact Info</h5>
                            </div>
                            <div>
                                Phone: {phone}
                            </div>
                            <div>
                                Email: {email}
                            </div>
                            </div>
                        </div>
                        <br></br>
                        <Paypal email={email} totalPrice={totalPrice} phone={phone} date={date} time={time} setCart={setCart} cart={cart} />
                    </div>
                </div>
            </Container>
        </div>
    )
}
