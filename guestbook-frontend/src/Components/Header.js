import React, {Component} from 'react';
import './Styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
};

const mapDispachToProps = (dispach) => {

    return {
        LoginBtn: () => dispach({type: "LOGIN"})
    }
};


class Header extends Component {


    addGuestHandler = () => {
        this.props.guestHandler();
    };


    render() {
        return (
            <Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Guestbook</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={this.addGuestHandler}>Add New Guest</Nav.Link>
                        <Nav.Link>Show all</Nav.Link>
                        <Nav.Link onClick={this.props.LoginBtn}>{this.props.isLoggedIn ? "LogOut" : "Login"}</Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Header);