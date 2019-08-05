import React, { Component } from "react";
import "./Styles.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    showLogin: state.showLogin
  };
};

const mapDispachToProps = dispach => {
  return {
    LoginConfirm: profile => dispach({ type: "IsLoggedIn", UserProfile: profile }),
    handleShowLogin: () => dispach({ type: "LOGIN" })
  };
};

class Login extends Component {
  userLogin = {
    UserName: "",
    Password: ""
  };

  NewUser = {
    UserName: "",
    Password: "",
    cnfrmPassword: ""
  };

  state = {
    showReg: false
  };

  handleLogin = () => {
    fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.userLogin.UserName,
        password: this.userLogin.Password
      })
    })
      .then(res => res.json())
      .then(user => {
        this.props.LoginConfirm(user.profile);
      });
  };

  handleReg = () => {
if (this.NewUser.UserName.length<3){
  alert('Username is Too Short, Plese type another')

}else {
  if(this.NewUser.cnfrmPassword === this.NewUser.Password){

    fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.NewUser.UserName,
        password: this.NewUser.Password
      })
    })
        .then(res => res.json())
        .then(user => {
          this.props.LoginConfirm(user.profile);
        });

  }else {
    alert('Passwords Not match, Please try again')
  }
}

/*    fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.userLogin.UserName,
        password: this.userLogin.Password
      })
    })
        .then(res => res.json())
        .then(user => {
          this.props.LoginConfirm(user.profile);
        });*/

  };

  handleGoogleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showLogin} onHide={this.props.handleShowLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button className="loginBtn loginBtn--facebook">
              Login with Facebook
            </Button>
            <Button
              onClick={this.handleGoogleLogin}
              className="loginBtn loginBtn--google"
            >
              Login with Google
            </Button>
            <br />
            <br />

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="UserName"
                type="text"
                onChange={e => {
                  this.userLogin.UserName = e.target.value;
                }}
                placeholder="Your Username"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="Password"
                type="password"
                onChange={e => {
                  this.userLogin.Password = e.target.value;
                }}
                placeholder="Your Password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleShowLogin}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleLogin}>
              Login
            </Button>
          </Modal.Footer>
          <Modal.Footer>
            <h6>Not a user?</h6>
            <Button
              variant="warning"
              onClick={() => {
                this.props.handleShowLogin() &&
                  this.setState({ showReg: true });
              }}
            >
              Sign Up !
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showReg} onHide={()=>{this.setState({showReg:false})}}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="UserName"
                type="text"
                onChange={e => {
                  this.NewUser.UserName = e.target.value;
                }}
                placeholder="Your Username"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="Password"
                type="password"
                onChange={e => {
                  this.NewUser.Password = e.target.value;
                }}
                placeholder="Type Password"
              />
              <Form.Label>Type again Password</Form.Label>
              <Form.Control
                name="Password"
                type="password"
                onChange={e => {
                  this.NewUser.cnfrmPassword = e.target.value;
                }}
                placeholder="Type Password again"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.props.handleShowLogin() &&
                  this.setState({ showReg: false });
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleReg}>
              Finish
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Login);
