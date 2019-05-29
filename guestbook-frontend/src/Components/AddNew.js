import React, {Component} from 'react';
import './Styles.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class AddNew extends Component {

    state = {
        show: false,
        Name: '',
        Body: ''
    };


    handleClose = () => {
        this.setState({show: false});
    };
    handleAdd = () => {
        this.handleClose();
        this.props.addHandler(this.state.Name, this.state.Body) // here we sends inputs the imputs
    };

    handleShow = () => {
        this.setState({show: true});
    };


    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Guest</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                this.setState({Name: e.target.value})
                            }} placeholder="Your Name"/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Text....</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => {
                                this.setState({Body: e.target.value})
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

export default AddNew;
