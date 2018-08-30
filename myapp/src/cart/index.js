import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './cart.css';
import CartItem from './cart-item';
import {goBack,push} from 'react-router-redux';
import {totalPriceAction} from '../actions/total-price-action'
const mapStateToProps = (state) => {
    return ({ all_products: state.all_products_reducer.all_products, cart_products: state.cart_products_reducer.cart_products })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({goBack,push,totalPriceAction}, dispatch) })
}

class Cart extends Component {
    goBack=()=>{
        this.props.action.goBack();
    }
    goCheckout=(totalPrice)=>{
        if(this.props.cart_products.length!==0){
            this.props.action.totalPriceAction(totalPrice);
            this.props.action.push("/shipping")
        }
   
    }

    render() {
        var productPrice, totalPrice = 0;
        const totalPriceArray = this.props.cart_products.map((product) => {
            productPrice = parseInt(product.count, 10) * parseInt(this.props.all_products.id[product.id].price, 10)
            return (productPrice)
        })
        totalPriceArray.forEach((num) => {
            totalPrice = totalPrice + num;
        })
        const empty = [<div className="Empty">Your Cart is Empty</div>]
        var CartItems = this.props.cart_products.map((product, index) => <CartItem id={product.id} key={index} count={product.count} />)
        return (
            <div className="Cart">
                <div className="Cart-Title">
                    Your Cart
                 </div>
                <div>
                    {this.props.cart_products.length !== 0 ?

                        CartItems
                        :
                        empty
                    }
                </div>
                <div className="Price-Calculation">
                    <div className="Price-Listing">
                        <div className="Price-Content">
                            <div>Subtotal</div>
                            <div>Shipping</div>
                            <div>Taxes</div>
                            <div className="Total-Content">
                                Total
                            </div>
                        </div>
                        <div className="Price-Value">
                            <div>${totalPrice}</div>
                            <div>-</div>
                            <div>-</div>
                            <div className="Total-Price">
                                ${totalPrice}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Forward-Buttons">
                    <div className="Continue" onClick={this.goBack}>
                        <div>CONTINUE SHOPPING</div>
                    </div>
                    <div className="Checkout" onClick={()=>this.goCheckout(totalPrice)}>
                        <div>CHECKOUT</div>
                    </div>
                </div>
                <div className="Forward-Buttons-Mobile">
                    <div className="Continue-Mobile" onClick={this.goBack}>
                        <div>BACK</div>
                    </div>
                    <div className="Checkout-Mobile" onClick={()=>this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO CHECKOUT</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
