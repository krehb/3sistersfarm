import React, {useState} from 'react'
import firebase from '../../firebase'

import {storage} from '../../firebase'
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'

export default function AddProduct({setControls, controls}) {
  
    const [image, setImage] = useState(null);
    const [name, setName]= useState('');
    const [unit, setUnit] = useState('')
    const [des, setDes] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [loading, setLoading] = useState(false)

    const db = firebase.firestore();

    const handleAddProduct = () => {
        setLoading(true)
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                        console.log('uploaded img', url)
                        AddData(url);
                        
                    });
            }
        )
    }

    const AddData = (url) => {
        db.collection('products').add({
            name: name,
            price: price,
            units: unit,
            maxLeft: stock,
            img: url,
            des: des,
            showProduct: true,
            imgName: image.name
        }).then(
            setLoading(false),
            alert("product has been add, check and refresh the page")
        )
    }
  


    const handleChange = (e) => {
        setImage(e.target.files[0])
    }


    const handleBack = () => {
        console.log('clicked', controls)
        setControls(1)
    }

    return (
        <Container style={{backgroundColor: '#f7de97'}} >
            <Row>
                <Col style={{textAlign: 'center', fontWeight: '600'}} >
                    <br></br>
                    <div style={{display: 'flex', justifyContent: 'center'}} >
                        <FontAwesomeIcon size='2x' onClick={handleBack} icon={faArrowLeft} style={{marginRight: '20px'}} />
                        <h2>Add A Prodcut</h2>
                    </div>
                    <br></br>
                    <div  >
                        <div>
                            <span>Product Name</span>
                            {' '}
                            <input type='text' onChange={(e) => setName(e.target.value)} placeholder='kittens' />
                        </div>
                        <hr></hr>
                        <br></br>
                        <div>
                            <span>Product unit</span>
                            {' '}
                            <input type='text' onChange={(e) => setUnit(e.target.value)} placeholder='kitten' />
                        </div>
                        <hr></hr>
                        <br></br>
                        <div>
                            <span>Product Description</span>
                            {' '}
                            <textarea type='text' onChange={(e) => setDes(e.target.value)} placeholder='pretty small n cute' />
                        </div>
                        <hr></hr>
                        <br></br>
                        <div>
                            <span>Product Price</span>
                            {' '}$
                            <input type='number' onChange={(e) => setPrice(e.target.value)} placeholder='0'  />
                        </div>
                        <hr></hr>
                        <br></br>
                        <div>
                            <span>Quanity in Stock</span>
                            {' '}
                            <input type='number' onChange={(e) => setStock(e.target.value)} placeholder='7' />
                        </div>
                        <hr></hr>
                        <br></br>
                        <div>
                            Upload An Image
                            {' '}
                            <input type="file" onChange={handleChange} />
                        </div>
                        <hr></hr>
                        <br></br>
                        <br></br>

                        <div>
                            {loading
                                ?<Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                : <Button onClick={handleAddProduct} style={{fontSize: '30px'}} >ADD</Button>
                            }
                        </div>
                        
                        <br></br>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
