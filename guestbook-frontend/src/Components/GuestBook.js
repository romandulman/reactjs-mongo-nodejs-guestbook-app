import React, {Component} from 'react';
import './Styles.css';
import Guest from './Guest';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

    addOne = (Name, Body) => {
        let arr = {
            Name: Name,
            Body: Body
        };

        fetch('http://127.0.0.1:8080/postguest', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({arr})
        }).then((res) => {
            this.setState({
                data: [...this.state.data, arr]
            });

        });
    };

    componentDidMount() {

        fetch("http://127.0.0.1:8080/guests")
            .then(res => res.json())
            .then(
                (result) => {
                    let data = result;
                    this.setState({data});
                    //  console.log(this.state)
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    removeHandler = () => {

    };

    render() {
        const ViewGuests = this.state.data.map((guest, index) =>
            <Col sm={4}> <Guest c cla key={index} RemoveHandler={this.removeHandler} Id={index}
                                guestName={guest.Name} guestBody={String(guest.Body)}/> </Col>
        );

        return (
            <div className="divMargin">
                <Container>
                    <Row>{ViewGuests}</Row>
                </Container>

            </div>
        );
    }
}

export default GuestBook;