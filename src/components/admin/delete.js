import React, {useState} from 'react'
import firebase from '../../firebase'
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {storage} from '../../firebase'

export default function Delete({product, setControls}) {

    const db = firebase.firestore();
    var storageRef = storage.ref();
    const [loading, setLoading] = useState(false)


    const delateHanlder = (product) => {
        setLoading(true)

        console.log(product)

        db.collection("products").doc(`${product.id}`).delete().then(() => {
            console.log("Document successfully deleted!");
            setLoading(false)
            setControls(1)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        storageRef.child(`images/${product.data.imgName}`).delete().then(() => {
            console.log('deleted Img')
        }).catch((error) => {
            console.log(error)
        });
    }


    return (
        <div>
            <h3>{product.data.name}</h3>
            {loading
                ? <Spinner animation="border" />
                : <Button onClick={() => delateHanlder(product)} style={{marginLeft: '20px'}} variant="danger" >Delate</Button>
            }
        </div>
    )
}
