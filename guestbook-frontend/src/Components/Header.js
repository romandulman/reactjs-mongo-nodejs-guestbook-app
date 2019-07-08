import React, {Component} from 'react';
import './Styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Login from './Login'

import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        LoggedUserName: state.LoggedUserName
    }
};

const mapDispachToProps = (dispach) => {

    return {
        LoginBtn: () => dispach({type: "LOGIN"}),
        ShowModal: () => dispach({type: "SHOWMODAL"})
    }
};


class Header extends Component {

    addGuestHandler = () => {
        (this.props.isLoggedIn ? this.props.ShowModal() : this.props.LoginBtn())

    };

    render() {
        return (
            <Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Event Guestbook</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={this.addGuestHandler}>Add New Guest</Nav.Link>
                        <Nav.Link>Show all</Nav.Link>
                        <Nav.Link onClick={this.props.LoginBtn}>{this.props.isLoggedIn ? "Logout" : "Login"}</Nav.Link>
                    </Nav>
                    <Nav.Item><h5
                        className='hiText'> {this.props.isLoggedIn ? "Hi " + this.props.LoggedUserName + " !" : ""}</h5>
                    </Nav.Item>
                </Navbar.Collapse>
                <Login/>

            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Header);