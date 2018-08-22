import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Home from './home'
class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <Home/>
      </div>
    );
  }
}

export default App;
