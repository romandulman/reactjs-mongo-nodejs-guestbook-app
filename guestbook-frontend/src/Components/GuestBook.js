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
                    Name: 'a',
                    Body: 'b'
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
        this.setState({data});
        console.log(data);
    };

    componentDidMount() {

       // if (data != null) data = 0;//this.setState({data});

    }
removeHandler = () =>{

};
    render(){
      //  const data = this.state.data;

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
                            this.state.data.map((guest, index) =>

                                <Col sm={4}> <Guest key={index} RemoveHandler={this.removeHandler} Id={index}
                                                   guestName={guest.Name} guestBody={String(guest.Body)}/> </Col>
                            )}
                    </Row>
                </Container>

            </div>
        );
    }
}

export default GuestBook;