import React, { Component } from 'react';
import FreeShipping from './freeshipping';
import './header.css'
import MenuBar from './menu-bar';
class Header extends Component {
  render() {
    return (
      <div className="App">
          <FreeShipping/>
          <MenuBar/>
      </div>
    );
  }
}

export default Header;
