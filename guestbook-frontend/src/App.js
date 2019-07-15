import React, {Component} from 'react';
import './App.css';
import Footer from './Components/Footer'
import GuestBook from './Components/GuestBook'
import Profile from './Components/Profile'
import Header from './Components/Header'
import {BrowserRouter as Router, Route,Redirect, Link} from "react-router-dom";


class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Header/>
                    <Route path='/'>
                        <Redirect to="/guests" />
                    </Route>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/guests" component={GuestBook}/>

                </Router>

                <Footer/>
            </div>
        );
    }
}

export default App;
