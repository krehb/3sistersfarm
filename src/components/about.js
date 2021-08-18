import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';


export default function about() {
    return (
        <Container fluid >
            <Container>
            <Row>
                <Col sm={6}>
                    <div>
                        <br></br>
                        <h2>About</h2>
                        <p>Three sisters' farm is a sustainable and organic farm with a wide variety of food, with the main comidities being corn, soybean, oats, sheep (pasture raised). Ortrude decribes what its like to be a first generation sheep women farmer.</p>
                        <p>If you don't see them in the hay field, you'll see them working hard somewhere else taking care of hundards of sheep, or working to make their environment flourish with biodiversity.</p>
                    </div>
                </Col>
                <Col sm={6}><iframe className="video" src="https://www.youtube.com/embed/pJkQ4fawhBg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </Col>
            </Row>
            </Container>
        </Container>
    )
}
