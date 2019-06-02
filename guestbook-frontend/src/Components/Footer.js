import React, {Component} from 'react';
import './Styles.css';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
};

class Footer extends Component {

    render() {
        return (
            <div>
                <h6>{this.props.isLoggedIn ? "You Are Logged In, now you can remove Guests..." : "Please Login to remove Guests !"}</h6>
            <br/>
                <h6>Roman Dulman 2019 </h6>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Footer);