import React, { Component } from "react";
import "./Styles.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import AddNew from "./AddNew";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

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
        className="fixed-top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>Event Guestbook</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              {" "}
              <Link to="/guests">Home</Link>
            </Nav.Link>
            <Nav.Link onClick={this.addGuestHandler}>Add New Guest</Nav.Link>
          </Nav>
          <Nav.Item>
            <h5 className="hiText">
              {" "}
              {this.props.isLoggedIn
                ? "Hi " + this.props.UserProfile.Username + " !"
                : ""}
            </h5>
          </Nav.Item>
          <Nav.Item>
            {this.props.isLoggedIn && (
              <Nav.Link>
                <Link to="/profile">My Profile</Link>
              </Nav.Link>
            )}
          </Nav.Item>
          <Nav.Item>
            {" "}
            <Nav.Link onClick={this.props.LoginBtn}>
              {this.props.isLoggedIn ? "Logout" : "Login"}
            </Nav.Link>
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
