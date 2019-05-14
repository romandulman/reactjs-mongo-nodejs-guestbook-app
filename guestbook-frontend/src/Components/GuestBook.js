import React, {Component} from 'react';
import './Styles.css';
import Guest from './Guest';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class GuestBook extends Component {
    constructor(){
        super();

    }
    render(){
        return (
            <div className="divMargin">

                <Container >
                    <Row>
                        <Col md={6}>
                            <Guest guestName="ggg"/>

                        </Col>
                        <Col md={6}>
                            <Guest/>

                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default GuestBook;