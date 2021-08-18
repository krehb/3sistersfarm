import React, {useState, useEffect} from 'react'
import { Table, Container, Button } from 'react-bootstrap';
import CartCard from './cartCard';
import {Link, useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import Paypal from '../checkout/Paypal';

export default function Cart({cart, setCart, date, setDate, setTime, email, setEmail, setPhone}) {

    const [priceTotal, setPriceTotal] = useState(0)



    let history = useHistory();

    function handleClick() {
      history.push("/checkout");
    }
  

    useEffect(() => {
        totalPriceHandler()
    }, [cart])

    const totalPriceHandler = () => {
        const newGroup = [0]
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        cart.forEach(item => {
            newGroup.push(item.price * item.qty)
        });
        setPriceTotal(newGroup.reduce(reducer))
    }

    const ContinueHandler = () => {
        
        if(date === ''){
            alert('click on the date and choose a time');
        } else {
            if(email === ''){
                alert('please provide email for email receipt');
            } else {
                history.push("/checkout");
            }
        }

    }

    return (
        <div>
            <Container>
                <br></br>
                <FontAwesomeIcon style={{marginLeft: '30px'}} size="5x"  icon={faShoppingBasket} />
                <br></br>
                <br></br>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price per Unit</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => 
                        <CartCard item={item} setCart={setCart} cart={cart} />
                    )}
                    <tr style={{fontWeight: '700'}} >
                        <td colSpan="2">Total</td>
                        <td colSpan="2">${priceTotal}.00</td>
                    </tr>
                </tbody>
                </Table>
                <br></br>
                <div style={{display: "flex", justifyContent: 'space-between',}} >
                    <Link to='/' ><Button>Back</Button></Link>
                    <Button onClick={ContinueHandler} variant='success' >Continue</Button>
                </div>
                <br></br>
                <div style={{display: 'flex', justifyContent: 'center'}} >
                    <div>
                        <div>
                            <h2>Let Us Know When you are coming</h2>
                        </div>
                        <div>
                            <h6>Fill Form Below</h6>
                        </div>
                        <div>
                            <input type='date' onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div style={{marginTop: '20px'}} >
                            <input type='time' onChange={(e) => setTime(e.target.value) } />
                        </div>
                        <div style={{marginTop: '20px'}} >
                            Phone Number {' '}
                            <input type='phone' placeholder='217-333-4444' onChange={(e) => setPhone(e.target.value) } />
                        </div>
                        <div style={{marginTop: '20px'}} >
                            Email {' '}
                            <input type='email' placeholder='example@email.com' onChange={(e) => setEmail(e.target.value) } />
                        </div>
                    </div>
                </div>
                <br></br>
            </Container>
        </div>
    )
}
