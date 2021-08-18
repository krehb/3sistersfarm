import React from 'react'

export default function CartCard({item, cart, setCart}) {


    const removeItemHandler = (name) => {
        setCart(cart.filter(item => item.name !== name))
    }


    return (
        <tr>
            <td>{item.name}</td>
            <td> {item.qty} </td>
            <td>${item.price} per {item.units}</td>
            <td  style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>${item.qty*item.price}.00 </span>
                <span onClick={ () => removeItemHandler(item.name)}
                    style={{color: 'white', backgroundColor: 'red', padding: '2px 6px 2px 6px', cursor: 'pointer', borderRadius: '7px', fontWeight: '700'}} >
                    X
                </span>
            </td>
        </tr>
    )
}
