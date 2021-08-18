import React, {useState, useEffect} from 'react'
import firebase from '../../firebase'
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {storage} from '../../firebase'
import Delete from './delete';

export default function DelateProduct({setControls}) {
    
    const db = firebase.firestore();
    var storageRef = storage.ref();

    const [productsList, SetProductsList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [loading])



    const getData = () => {

        db.collection("products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());

                let addingObject = {
                    data: doc.data(),
                    id: doc.id
                }

                SetProductsList(productsList => [...productsList, addingObject]);

            });
        });
        
    }


    const handleBack = () => {
        setControls(1)
    }

    return (
        <Container style={{backgroundColor: '#f7de97'}} >
            <Row>
                <Col style={{textAlign: 'center', fontWeight: '600'}} >
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} >
                        <FontAwesomeIcon size='2x' onClick={handleBack} icon={faArrowLeft} style={{marginRight: '20px', marginTop: '6px'}} />
                        <h2>Product List</h2>
                    </div>
                    <div>
                        {productsList.map( product => <Delete product={product} setControls={setControls} />)}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
