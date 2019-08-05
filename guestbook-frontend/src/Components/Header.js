import React, { Component } from "react";
import "./Styles.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown"
import Login from "./Login";
import AddNew from "./AddNew";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader  } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    UserProfile: state.UserProfile
  };
};

const mapDispachToProps = dispach => {
  return {
    LoginConfirm: profile =>
      dispach({ type: "IsLoggedIn", UserProfile: profile }),
    LoginBtn: () => dispach({ type: "LOGIN" }),
    ShowModal: () => dispach({ type: "SHOWMODAL" })
  };
};

class Header extends Component {
  addGuestHandler = () => {
    this.props.isLoggedIn ? this.props.ShowModal() : this.props.LoginBtn();
  };

  componentDidMount() {
    const handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    };

    fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(handleErrors)
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(profileRes => {
        this.props.LoginConfirm(profileRes.profile);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Navbar
        className="fixed-top shadow p-3 bg-white mb-5 navOve"
        collapseOnSelect
        expand="lg"
        bg="light"

      >
        <Navbar.Brand ><FontAwesomeIcon icon={faBookReader}/> Event Guestbook</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/guests"><Button>Home</Button></Link>
            </Nav.Link>
            <Nav.Link >
            <Button color="primary" onClick={this.addGuestHandler} >
             Add New Guest
            </Button></Nav.Link>
          </Nav>
          <Nav.Item>
            <h5 className="hiText">
              {this.props.isLoggedIn
                ? "Hi " + this.props.UserProfile.Username + " !"
                : ""}
            </h5>
          </Nav.Item>
          <Nav.Item>

              <Nav.Link>                <Dropdown>

              <Dropdown.Toggle as ={Link}>

                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                  <Badge badgeContent={this.props.isLoggedIn ? 4 : 0} color="secondary">
                  <AccountCircle />
                  </Badge>
                </IconButton>

              </Dropdown.Toggle>

              <Dropdown.Menu alignRight={true}>
                {this.props.isLoggedIn && (  <Dropdown.Item> <Link to="/profile">My Profile</Link></Dropdown.Item>  )}
                <Dropdown.Item onClick={this.props.LoginBtn}> {this.props.isLoggedIn ? "Logout" : "Login"}
              </Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>





              </Nav.Link>
          </Nav.Item>
          <Nav.Item>

          </Nav.Item>
        </Navbar.Collapse>
        <Login />
        <AddNew />
      </Navbar>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Header);
