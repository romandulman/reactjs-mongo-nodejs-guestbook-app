import React, {Component} from 'react';
import './Styles.css';
import Guest from './Guest';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class GuestBook extends Component {
        state = {
            data: [
                {
                    Name: '',
                    Body: ''
                }
            ]
        };

    addOne = (Name, Body) => {
        let arr = {
            Name: Name,
            Body: Body
        };

        fetch('http://127.0.0.1:8080/postguest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({arr})

        })  .then(response => response.json())
            .then(res => {
            this.setState({
                data: [...this.state.data, res]
            });
                console.log(res)
        });
    };

    componentDidMount() {

        fetch("http://127.0.0.1:8080/guests")
            .then(res => res.json())
            .then(
                (result) => {
                    let data = result;
                    this.setState({data});
                },

                (error) => {
                 //   this.setState({
                   //     isLoaded: true,
                   //     error
                  //  });

                }
            )
    }

    RemoveHandler = (id) => {

        const data = this.state.data;
        fetch('http://127.0.0.1:8080/delguest/'+id , {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}

        })
            .then(res => res.json())
            .then((res) => {
             let  newData = data.filter(guest => guest._id !== id);
                this.setState({
                    data: newData
                });

        });
    };

    render() {
        const ViewGuests = this.state.data.map((guest) =>
            <Col sm={4}> <Guest  RemoveHandler={this.RemoveHandler} Id={guest._id}
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