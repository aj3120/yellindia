import React, { Component } from 'react';
import './shop.css';
import {Link} from 'react-router-dom'
class Shop extends Component {
  render() {
    return (
      <div className="Shop-Section">
        <div className="Shop-Title">
          Shop
            </div>
        <div className="Shop-Images">
          <div className="Shop-Jersey">
            <img src="assets/shop1.png" alt="shop" />
            <div className="Shop-Button-Jersey" id="2"><Link to="/jumpsuits/2">SHOP NOW</Link></div>
            <div className="Label-Shop-Jersey">JERSEY</div>
          </div>
          <div className="Shop-Jackets">
            <img src="assets/shop4.jpg"alt="shop" />
            <div className="Shop-Button-Jackets" id="1"><Link to="/jumpsuits/1">SHOP NOW</Link></div>
            <div className="Label-Shop-Jackets">JACKETS</div>
          </div>
          <div className="Shop-Shirts">
          <div className="Shop-Button-Shirts"><Link to="#">SHOP NOW</Link></div>
            <img src="assets/shop2.jpg" alt="shop" />
            <div className="Label-Shop-Shirts">SHIRTS</div>
          </div>
          <div className="Shop-Tops">
         <div className="Shop-Button-Tops"> <Link to="#">SHOP NOW</Link></div>
            <img src="assets/shop3.jpg"  alt="shop" />
            <div className="Label-Shop-Tops">TOPS</div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Shop;