import React, {Component} from 'react';
import './Styles.css';
import Guest from './Guest';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
let arr;
class GuestBook extends Component {
    constructor(){
        super();
        this.state = {
            data: [
                {
                    Name: '',
                    Body: ''
                }
            ]

        }
    }

    addOne = (Name,Body)=>{
       const data = this.state.data;
        arr = {
            Name: Name,
            Body: Body
        };
        data.push(arr);
        console.log(data);
    };

    render(){
        return (
            <div className="divMargin">
                <Container>
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