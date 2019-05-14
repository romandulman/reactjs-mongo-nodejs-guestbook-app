import React, {Component} from 'react';
import './Styles.css';
import Card from 'react-bootstrap/Card';

class Guest extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <Card>
                <Card.Header>{this.props.guestName}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {this.props.guestBody}
                        </p>
                        <footer className="blockquote-footer">
                            Best Regards, <cite title="Source Title">{this.props.guestName}</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }
}

export default Guest;