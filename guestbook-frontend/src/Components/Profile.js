import React, {Component} from 'react';
import './Styles.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        UserProfile: state.UserProfile
    }
};

class Profile extends Component {

    render() {

        return (
            <div className="divMargin">
                <Container>
                    <Row><h1>Profile</h1></Row>
                    <Row><h6>Name: {this.props.UserProfile.Username}</h6></Row>
                    <Row><h6>Email: </h6></Row>
                    <Row><h6>Profile Image: </h6></Row>
                    <Row><img width="150px" src={this.props.UserProfile.ProfileImage}></img></Row>
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Profile);