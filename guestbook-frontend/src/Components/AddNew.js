import React, {Component} from 'react';
import './Styles.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Webcam from 'react-webcam'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        showAddModal: state.showAddModal,
        GuestsList: state.GuestsList
    }
};

const mapDispachToProps = (dispach) => {

    return {
        sendGuestsData: (guestsData) => dispach({type: "DATA", guestsData: guestsData}),
        ShowModal: () => dispach({type: "SHOWMODAL"}),
    }
};
let arr = {
    Name: '',
    Body: ''
};
class AddNew extends Component {
/*
    state = {
        show: false,
        Name: '',
        Body: ''
    };*/

    addOne = (Name, Body) => {



    };

    handleClose = () => {
       // this.setState({show: false});
        this.props.ShowModal();

    };

    handleAdd = () => {
        this.handleClose();
      //  this.props.addHandler(this.state.Name, this.state.Body) // here we sends inputs the imputs
        fetch('http://127.0.0.1:8080/postguest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({arr})

        }).then(response => response.json())
            .then(res => {

                let AddnewData = [...this.props.GuestsList, res]
                this.props.sendGuestsData(AddnewData)

                console.log(res)
            });
    };

    handleShow = () => {
        //this.setState({show: true});

    };


    render() {
        return (
            <Modal show={this.props.showAddModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Guest</Modal.Title>
                </Modal.Header>
                <Modal.Body>
<Webcam/>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => {

                            //    this.setState({Name: e.target.value})
                                arr.Name = e.target.value

                            }} placeholder="Your Name"/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Text....</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => {

                               // this.setState({Body: e.target.value})
                                arr.Body = e.target.value

                                }} rows="3"/>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleAdd}>
                        Add Guest
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}

export default connect(mapStateToProps, mapDispachToProps)(AddNew);
