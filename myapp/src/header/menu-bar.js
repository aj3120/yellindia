import React, { Component } from 'react';

class MenuBar extends Component {
    render() {
        return (

            <div className="Menu-Bar">
                <div className="Menu-Content">
                    <div className="Mobile-Menu-Button">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="Menu-Left">
                        <div className="Logo">
                            <img src="assets/group-2.svg" alt="logo" />
                        </div>
                        <div className="Shop">
                            <p>SHOP</p>
                            <div className="ShopArrow"></div>
                        </div>


                        <div className="Outlet">
                            <p>OUTLET</p>
                            <div className="ShopArrow"></div>
                        </div>
                        <div className="Stores">
                            <p>STORES</p>
                            <div className="ShopArrow"></div>
                        </div>
                    </div>
                    <div className="Menu-Right">
                        <div className="Login">
                            <p>LOGIN</p>
                        </div>
                        <div className="Search">
                            <img src="assets/shape_2.svg" alt="search" />
                        </div>
                        <div className="Wishlist">
                            <img src="assets/shape.svg" alt="wishlist" />
                        </div>
                        <div className="Cart-List">
                            <img src="assets/cart.svg" alt="cart" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default MenuBar
