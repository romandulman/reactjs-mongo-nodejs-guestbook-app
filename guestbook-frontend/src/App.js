import React, {Component} from 'react';
import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import GuestBook from './Components/GuestBook'

function App() {
  return (
    <div className="App">

      <Header/>
      <GuestBook/>
      <Footer/>

    </div>
  );
}

export default App;
