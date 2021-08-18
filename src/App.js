import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import firebase from './firebase';

import Navbar from './components/navbar';
import StoreBody from './components/store/storeBody';
import MyMapComponent from './components/location';
import About from './components/about';
import Cart from './components/cart/cart'
import Footer from './components/footer/footer';
import Admin from './components/admin/admin'
import Checkout from './components/checkout/checkout'

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  //time for pick up
  const [date, setDate] = useState('')
  const [time, setTime] = useState('time is unknown')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [totalPrice, setPriceTotal] = useState(1)

  const ref = firebase.firestore().collection("products");

  function getData() {
    setLoading(true);

    ref.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
          let data = {
            id: doc.id,
            product: doc.data()
          }
          items.push(data)
          // console.log(doc.id, " => ", doc.data());
      });
      setProducts(items)
      setLoading(false)
    });

  }

  useEffect(()=> {
    getData();
  }, []);

  useEffect(() => {
    totalPriceHandler();
  }, [cart])

  const myRef = useRef(null);

  const executeScroll = () => {
    setTimeout(function(){ myRef.current.scrollIntoView();  }, 500);
  }

  const totalPriceHandler = () => {
    const newGroup = [0]
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    cart.forEach(item => {
        newGroup.push(item.price * item.qty)
    });
    setPriceTotal(newGroup.reduce(reducer))
  }
  

  const addToCartHandler = (itemSelected) => {

    console.log(itemSelected)
    setCart(cart => [...cart, itemSelected ] );

    cart.forEach(item => {
      if(item.name === itemSelected.name){
        let newDouble = {
          name: item.name,
          qty: item.qty + itemSelected.qty,
          price: item.price,
          units: item.units,
          id: item.id,
          maxLeft: item.maxLeft,
          des: item.des,
          showProduct: true,
          img: item.img,
          imgName: item.imgName
        }
        setCart(cart.filter(item => item.name !== itemSelected.name))
        setCart(cart => [...cart, newDouble ] );
      }
    })
  }

  return (
    <Router>
    <div className="App">
      <Navbar executeScroll={executeScroll} cart={cart} />
      <Switch>
        <Route path='/' exact render={()=> <div>
          <StoreBody products={products} cart={cart} addToCartHandler={addToCartHandler} />
          <div ref={myRef} style={{backgroundColor: "#5d5e5e", color: '#F8F9FA'}}>
            <h1 style={{paddingLeft: "30px", paddingTop: "30px"}} >Where to Pick Up</h1>
            <MyMapComponent />
          </div>
          <About style={{backgroundColor: '#C1CFDA'}} />
        </div>} />
        <Route path='/checkout' exact render={() => <Checkout totalPrice={totalPrice} setCart={setCart} cart={cart} date={date} time={time} email={email} phone={phone} />}  />
        <Route path='/cart' exact render={()=> <Cart cart={cart} setCart={setCart} date={date} setDate={setDate} setTime={setTime} setEmail={setEmail} setPhone={setPhone} email={email} />} />
        <Route path='/admin' exact render={()=> <Admin/>} />
      </Switch>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
