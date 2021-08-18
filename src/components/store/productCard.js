import React, {useEffect, useState} from 'react';
import { Card, Button, Col, Spinner } from 'react-bootstrap';
import {Link, useLocation, useHistory} from 'react-router-dom';

import {storage} from '../../firebase'

export default function ProductCard({data, addToCartHandler, cart}) {


    const [qty, setQty] = useState("1")
    const [clicked, setClicked] = useState(true)


    const handleChange = (e) => {
        if((data.product.maxLeft < e.target.value) || (0 > e.target.value )){
            console.log('no left')
            alert(`There are only ${data.product.maxLeft} in stock`)
        } else {
            setQty(e.target.value)
        }
    }

    const handleClick = () => {
        const passingData = {
            name: data.product.name,
            qty: JSON.parse(qty),
            price: data.product.price,
            units: data.product.units,
            id: data.id,
            maxLeft: JSON.parse(data.product.maxLeft),
            des: data.product.des,
            showProduct: true,
            img: data.product.img,
            imgName: data.product.imgName
        }
        addToCartHandler(passingData)

        setClicked(false)
        setTimeout(function(){ setClicked(true) }, 600);

    }



    return (
        <>
        {data.product.showProduct &&
            <Col sm >
                <Card className="card" style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={data.product.img} />
                    <Card.Body>
                        <Card.Title> 
                            <div style={{display: 'flex'}} >
                                <input style={{width: '50px', marginRight:'20px'}} value={qty} onChange={handleChange}  type="number" />
                                {data.product.name}
                            </div>
                        </Card.Title>
                        <Card.Text>
                        <p>${data.product.price} <span style={{fontSize: '11px'}} >per {data.product.units}</span></p>
                        {data.product.des}
                        </Card.Text>

                        <div style={{display: 'flex'}} >
                            {clicked
                                ? <Button onClick={handleClick} variant="primary">Add to Cart</Button>
                                : <div style={{marginTop: '6px', width: '100px'}} ><Spinner style={{marginLeft: '30px'}} animation="border"/></div>
                            }
                    
                            {cart.length > 0 &&
                                <Link to='/cart' >
                                    <Button variant="success" style={{marginLeft: "10px"}} >Continue</Button>
                                </Link>
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        }
        </>
    )
}
