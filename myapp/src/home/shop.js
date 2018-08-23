import React, { Component } from 'react';
import './shop.css'
class Shop extends Component {
  render() {
    return (
      <div className="Shop-Section">
        <div className="Shop-Title">
          Shop
            </div>
        <div className="Shop-Images">
          <div className="Shop-Pants">
            <img src="assets/shop1.png" width="263px" height="400px"alt="shop" />
          </div>
          <div className="Shop-Jumpsuits">
            <img src="assets/shop3.png" width="263px" height="400px"alt="shop" />
          </div>
          <div className="Shop-Tops">
            <img src="assets/shop2.png" width="263px" height="400px" alt="shop" />
          </div>
          <div className="Shop-Accessories">
            <img src="assets/shop3.png" width="263px" height="400px"alt="shop" />
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;