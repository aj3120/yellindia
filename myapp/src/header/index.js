import React, { Component } from 'react';
import FreeShipping from './freeshipping';
import './header.css'
import MenuBar from './menu-bar';
import Menu from './menu';
class Header extends Component {
  render() {
    return (
      <div className="App">
          <div className="Header-Wrapper">
          <FreeShipping/>
          <MenuBar/>
          </div>
          <Menu/>
      </div>
    );
  }
}

export default Header;
