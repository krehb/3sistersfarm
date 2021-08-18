import React, {useRef, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import emailjs from 'emailjs-com';
import firebase from '../../firebase'

export default function Paypal({cart, date, time, phone, email, setCart, totalPrice}) {
    const paypal = useRef()
    const [currentUser, setCurrentUser] = useState('no email yet');
    const [sendingCart, setSendingCart] = useState('');


    //going to success page after payment
    let history = useHistory();
    const db = firebase.firestore();

    //updating count on stock in database
    const updateDatabase = () => {

        cart.forEach(product => {
            console.log(`${product.name}, maxLeft:${product.maxLeft}, qtyGetting:${product.qty}. final Stock #:${product.maxLeft-product.qty} `, product)

            db.collection('products').doc(`${product.id}`).set({
                name: product.name,
                price: product.price,
                units: product.units,
                maxLeft: product.maxLeft-product.qty,
                des: product.des,
                showProduct: true,
                img: product.img,
                imgName: product.imgName
            })

        });

    }
    

    //sending email
    const sendEmail = () => {
        console.log('email trying')
        let joiningArray = []

        cart.forEach(product => {
            joiningArray.push(`qty:(${product.qty}) ${product.name} for $${product.price}`)
        });
        let passingCart = joiningArray.join(' ')

        var templateParams = {
            date,
            time,
            phone,
            email,
            cart: passingCart,
            total: totalPrice
        };
        emailjs.send(`service_s1iupbf`, `template_3ip6q1n`, templateParams, `user_wMsrXtQPzUR7o5FOh6Hax`)
            .then((result) => {
                console.log('was emailed')
            }, (error) => {
                console.log(error.text);
            });
    }


    useEffect(()=> {
        //sending payment through paypal
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            description: "Cool and accurate kit",
                            amount: {
                                currency_code: 'USD',
                                value: totalPrice
                            }  
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
                sendEmail();
                updateDatabase();
                setTimeout(function(){ history.push('/success'); setCart([]) }, 1000);
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    },[])
    
    return (
        <div>
            <div ref={paypal} ></div>
        </div>
    )
}
