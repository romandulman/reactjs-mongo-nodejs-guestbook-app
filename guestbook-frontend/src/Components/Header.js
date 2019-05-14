import React, {Component} from 'react';
import './Styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Header extends Component {
    constructor() {
        super();
        //this.addGuestHandler = this.addGuestHandler.bind(this);
    }
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
                        <Nav.Link  onClick={this.addGuestHandler}>Add New Guest</Nav.Link>
                        <Nav.Link>Show all</Nav.Link>
                    </Nav>
                    {/*       <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>*/}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;