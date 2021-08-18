import React, {useState} from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap';
import AddProduct from './addProduct';
import DelateProduct from './delateProduct';

export default function Admin() {
  
    const [password, setPassword] = useState('')
    const [controls, setControls] = useState(2)


    const handleSubmit = () => {
        if(password === `iheartsheep`){
            setControls(1)
        }else {
            alert("password is incorrect");
        }
    }

    let renderAdmin = null


    if (controls === 1){
        renderAdmin = (
            <Container fluid style={{color: 'white', fontWeight: 800, fontSize: '30px'}} >
                <Row>
                <Col onClick={() => setControls(3)} style={{textAlign: 'center', backgroundColor: 'green', padding: '100px', cursor: 'pointer'}} >
                    Add a Product
                </Col>
                </Row>
                <Row>
                <Col  onClick={() => setControls(4)} style={{textAlign: 'center', backgroundColor: 'red', padding: '100px', cursor: 'pointer'}} >
                    Delate a Product
                </Col>
                </Row>
            </Container>
        )
    } else if (controls === 2){
        renderAdmin = (
            <Container fluid  style={{color: 'black', fontWeight: 800, fontSize: '30px', }} >
                <Row>
                    <Col style={{textAlign: 'center', backgroundColor: '#f7de97', paddingTop: '180px', paddingBottom: '180px'}}>
                        Password
                        {' '}
                        <input style={{fontSize: '20px'}} onChange={(e) => setPassword(e.target.value)} type='' />
                        {' '}
                        <Button onClick={handleSubmit} >Submit</Button>
                    </Col>
                </Row>
                <Row>
                    
                </Row>
            </Container>
        )
    } else if (controls === 3){
        renderAdmin = (
            <AddProduct setControls={setControls} controls={controls} />
        )
    } else if (controls === 4){
        renderAdmin = (
            <DelateProduct setControls={setControls}/>
        )
    }


    return (
        <>
            {renderAdmin}
        </>
    )
}
