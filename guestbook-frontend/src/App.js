import React, {Component} from 'react';
import './App.css';
import Footer from './Components/Footer'
import GuestBook from './Components/GuestBook'
import Profile from './Components/Profile'

//import AddNew from './Components/AddNew'
import Header from './Components/Header'
//import { Router, Route, Switch } from "react-router";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


class App extends Component {



    render() {
        return (
            <div className="App">
                <Router>
                    <Header/>

                    <Route path="/profile" component={Profile}/>
                    <Route path="/guests" component={GuestBook}/>

                </Router>

                <Footer/>
            </div>
        );
    }
}

export default App;
