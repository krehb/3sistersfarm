import React from 'react'
import ProductCard from './productCard'
import { Row } from 'react-bootstrap';

export default function storeBody({products, addToCartHandler, cart}) {

    const productsBannerStyle = {
        fontStyle: "italic"

    }

    return (
        <div className="store" >

            <h1 style={{textAlign: "center", paddingTop: "30px", color: 'white'}} >Buy <span style={productsBannerStyle} >Straw</span> & <span style={productsBannerStyle} >Sheep</span> Online for Pick Up!</h1>
                
            <div className='deck' >
                <Row>
                {products.map((data) => 
                    <ProductCard data={data} cart={cart} addToCartHandler={addToCartHandler} /> 
                )}
                </Row>
            </div>
        </div>
    )
}
