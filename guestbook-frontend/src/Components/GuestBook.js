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

    addOne = (Name,Body)=>{
        alert(Name+" "+ Body)
    };

    render(){
        return (
            <div className="divMargin">

                <Container >
                    <Row>
                        <Col md={6}>
                            <Guest guestName="123"/>

                        </Col>
                        <Col md={6}>
                            <Guest guestName="123"/>

                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default GuestBook;