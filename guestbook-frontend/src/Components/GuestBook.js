import React, {Component} from 'react';
import './Styles.css';
import Button from 'react-bootstrap/Button';

class GuestBook extends Component {
    constructor(){
        super();

    }
    render(){
        return (
            <div>
                <Button variant="primary">Primary</Button>
            </div>
        );
    }
}

export default GuestBook;