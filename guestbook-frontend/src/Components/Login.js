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

        LoginConfirm: (name) => dispach({type: "IsLoggedIn", LoggedUserName: name}),
        handleShowLogin: () => dispach({type: "LOGIN"})

    }
};


class Login extends Component {

    userLogin = {
        UserName: '',
        Password: ''
    };


    handleLogin = () => {
        this.props.LoginConfirm(this.userLogin.UserName);
        fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.userLogin.UserName,
                password: this.userLogin.Password
            })

        }).then((res) => {
            if (res) {
               console.log(JSON.stringify(res))

            }
        });

    };

    handleGoogleLogin = () => {
        window.open("http://127.0.0.1:8080/auth/google", "_self");
    };


    render() {
        return (
            <Modal show={this.props.showLogin} onHide={this.props.handleShowLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button className="loginBtn loginBtn--facebook">
                        Login with Facebook
                    </Button>

                    <Button onClick={this.handleGoogleLogin} className="loginBtn loginBtn--google">
                        Login with Google
                    </Button>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="UserName" type="text" onChange={(e) => {
                                this.userLogin.UserName = e.target.value
                            }} placeholder="Your Username"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="UserName" type="password" onChange={(e) => {
                                this.userLogin.Password = e.target.value
                            }}
                                          placeholder="Your Password"/>
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
