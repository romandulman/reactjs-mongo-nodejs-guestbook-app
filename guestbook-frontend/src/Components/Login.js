import React, {Component} from 'react';
import './Styles.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        showLogin: state.showLogin
    }
};

const mapDispachToProps = (dispach) => {

    return {
        LoginConfirm: () => dispach({type: "IsLoggedIn"}),
        handleShowLogin: () => dispach({type: "LOGIN"})

    }
};
class Login extends Component {



    handleLogin = () => {
       // this.handleClose();
        fetch('http://127.0.0.1:8080/postguest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        }).then((res) => {
            if(res){


            }
        });

    };



    render() {
        return (
            <Modal show={this.props.showLogin} onHide={this.props.handleShowLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                this.setState({UserName: e.target.value})
                            }} placeholder="Your Name"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => {
                                this.setState({Password: e.target.value})
                            }} placeholder="Your Password"/>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleShowLogin}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Login);
