import React, {Component} from 'react';
import './App.css';
import Footer from './Components/Footer'
import GuestBook from './Components/GuestBook'
import AddNew from './Components/AddNew'
import Header from './Components/Header'



class App extends Component {

    showAddGuestHandler = () =>{
        this.refs.addNew.handleShow();
    };
    addHandler = (Name,Body) =>{
        this.refs.addNewGuest.addOne(Name,Body)
    };


    render() {
        return (
            <div className="App">
                <AddNew ref="addNew" addHandler={this.addHandler} />
                <Header guestHandler={this.showAddGuestHandler}/>
                <GuestBook ref="addNewGuest"/>
                <Footer/>
            </div>
        );
    }
}

export default App;
