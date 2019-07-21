import React, { Component } from "react";
import "./Styles.css";
import Guest from "./Guest";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    showLogin: state.showLogin,
    GuestsList: state.GuestsList
  };
};

const mapDispachToProps = dispach => {
  return {
    LoginConfirm: name => dispach({ type: "IsLoggedIn", LoggedUserName: name }),
    sendGuestsData: guestsData =>
      dispach({ type: "DATA", guestsData: guestsData })
  };
};

class GuestBook extends Component {
  RemoveHandler = id => {
    const data = this.props.GuestsList;

    fetch("/guests/delguest/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(() => {
        let newData = data.filter(guest => guest._id !== id);
        /*  this.setState({
                      data: newData
                  });*/
        this.props.sendGuestsData(newData);
      });
  };

  componentDidMount() {
    const handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    };
    fetch("/guests/allguests")
      .then(handleErrors)
      .then(res => res.json())
      .then(result => {
        let data = result;
        this.props.sendGuestsData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const ViewGuests = this.props.GuestsList.map(guest => (
      <Col sm={4}>
        {" "}
        <Guest
          RemoveHandler={this.RemoveHandler}
          Id={guest._id}
          guestName={guest.Name}
          imageName={guest.Image}
          guestBody={String(guest.Body)}
        />{" "}
      </Col>
    ));

    return (
      <div className="divMargin">
        <Container>
          <Row>{ViewGuests}</Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(GuestBook);
