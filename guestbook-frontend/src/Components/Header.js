import React, {Component} from 'react';
import './Styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;