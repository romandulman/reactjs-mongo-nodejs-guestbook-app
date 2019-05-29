import React, {Component} from 'react';
import './Styles.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

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
                        <p>
                            {this.props.guestBody}
                        </p>
                        <footer className="blockquote-footer">
                            Best Regards, <cite title="Source Title">{this.props.guestName}</cite>
                        </footer>
                        <br/>
                        <Button variant="outline-danger" onClick={this.handleRemove}>Remove Guest</Button>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }
}

export default Guest;