import React, {Component} from 'react';
import './Styles.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'


const mapStateToProps = (state) => {
    return {
        showDeleteBtn: state.showDeleteBtn
    }
};
class Guest extends Component {

    handleRemove = () => {
        this.props.RemoveHandler(this.props.Id);
    };

    render() {
        return (
            <Card className="guestSty">
                <Card.Header>{this.props.guestName}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>{this.props.guestBody}</p>
                        {this.props.imageName && <p><img src={this.props.imageName} alt="Logo" /></p>}
                        <footer className="blockquote-footer">
                            Best Regards, <cite title="Source Title">{this.props.guestName}</cite>
                        </footer>
                        <br/>
                        {this.props.showDeleteBtn &&  <Button variant="outline-danger" onClick={this.handleRemove}>Remove Guest</Button>}
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }
}

export default connect(mapStateToProps)(Guest);