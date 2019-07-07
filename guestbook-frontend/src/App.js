import React, {Component} from 'react';
import './App.css';
import Footer from './Components/Footer'
import GuestBook from './Components/GuestBook'
import AddNew from './Components/AddNew'
import Header from './Components/Header'


class App extends Component {




    render() {
        return (
            <div className="App">
                <AddNew/>
                <Header/>
                <GuestBook/>
                <Footer/>
            </div>
        );
    }
}

export default App;
