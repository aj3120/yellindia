import React, { Component } from 'react';
import FreeShipping from './freeshipping';
import './header.css'
import MenuBar from './menu-bar';
import Menu from './menu';
class Header extends Component {
  render() {
    return (
      <div className="App">
          <FreeShipping/>
          <MenuBar/>
          <Menu/>
      </div>
    );
  }
}

export default Header;
