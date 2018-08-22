import React, { Component } from 'react';
import './home.css';
import TitleImage from './title-image';
import Products from './products';
import About from './about';
import Shop from './shop';
class Home extends Component {
  render() {
    return (
      <div className="Home">
          <TitleImage/>
          <Products/>
          <About/>
          <Shop/>
      </div>
    );
  }
}

export default Home;
