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
        this.setState={data}
        console.log(data);
    };
removeHandler = () =>{

};
    render(){
        return (
            <div className="divMargin">
                <Container>
                    <Row>
                     {/*   <Col md={6}>
                            <Guest guestName="123"/>
                        </Col>
                        <Col md={6}>
                            <Guest guestName="123"/>
                        </Col>*/}
                             {
                            data.map((guest, index) =>

                                <Col sm={4}> <Note key={index} RemoveHandler={this.removeHandler} Id={index}
                                                   task={guest.id} dateTime={String(guest.body)}/> </Col>
                            )}
                    </Row>
                </Container>

            </div>
        );
    }
}

export default GuestBook;