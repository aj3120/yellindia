import React, { Component } from 'react';
import { connect } from 'react-redux';
import './item.css';
import './shipping.css'
import { bindActionCreators } from 'redux';
import {replace,go} from 'react-router-redux';
import CheckoutItem from './item';
import './shopping-cart.css';
import './status.css';
import Status from './status1';
import SocialLogin from '../social-login';
const mapStateToProps = (state) => {
    return ({cart_products: state.cart_products_reducer.cart_products })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({go,replace}, dispatch) })
}

class Shipping extends Component {
    goBack=()=>{
        this.props.action.go(-2);
    }
    goCheckout=()=>{
            this.props.action.replace("/payment")
    }
    render() {
     var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
     return(
        <div className="Checkout-Item">
        <div className="Checkout-Title">
            Checkout
         </div>
        
        <div className="Shipping-Content">
            <div className="Shipping-Content-Left">
            <Status/>
            <div className="Shipping-Login">
            Login-With
            <SocialLogin/>
            </div>
            </div>
            <div className="Shipping-Content-Right" >
                <div className="Shipping-Items">
                    <div className="Shopping-Cart">Shopping Cart</div> <div className="Checkout-Count"><div>{this.props.cart_products.length}</div></div>
                </div>
                <div className="Divider-Line2">
                </div>
                {checkout}
            </div>
        </div>


         <div className="Forward-Buttons">
            <div className="Continue" onClick={this.goBack}>
                <div>CONTINUE SHOPPING</div>
            </div>
            <div className="Checkout" onClick={this.goCheckout}>
                <div>CONTINUE TO PAYMENT</div>
            </div>
        </div>
        <div className="Forward-Buttons-Mobile">
            <div className="Continue-Mobile"  onClick={this.goBack}>
                <div>BACK</div>
            </div>
            <div className="Checkout-Mobile" onClick={this.goCheckout}>
                <div>CONTINUE TO PAYMENT</div>
            </div>
        </div>
    </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
