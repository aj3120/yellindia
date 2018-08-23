import React, { Component } from 'react';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps=(state)=>{
    return({count:state.cart_products_reducer.cart_products.length})
}
const mapDispatchToProps=(dispatch)=>{
    return({action:bindActionCreators({push},dispatch)})
}
class MenuBar extends Component {
    goCart=()=>{
        this.props.action.push('/cart');
    }
    goHome=()=>{
        this.props.action.push('/');
    }
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
                        <div className="Logo" onClick={this.goHome}>
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
                        <div className="Cart-List" >
                            <div className="Cart-Count"  onClick={this.goCart}>
                            <div className="Count" >
                            {this.props.count}
                            </div>
                            
                            </div>
                            <img src="assets/cart.svg" alt="cart" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(MenuBar)
