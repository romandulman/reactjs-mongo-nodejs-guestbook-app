import React, {Component} from 'react';
import './Styles.css';
import Guest from './Guest';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {connect} from 'react-redux'



class Profile extends Component {



    render() {

        return (
            <div className="divMargin">
                <Container>
                    <Row><h1>Profile</h1></Row>
                </Container>

            </div>
        );
    }
}

export default Profile;