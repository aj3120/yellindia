import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {replace,go} from 'react-router-redux';
import CheckoutItem from './item';
import './shopping-cart.css';
import Status from './status2';
import './payment.css'
import './status.css';
import './checkout.css';
const mapStateToProps = (state) => {
    return ({cart_products: state.cart_products_reducer.cart_products})
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({replace,go}, dispatch) })
}

class Payment extends Component {
    goBack=()=>{
        this.props.action.go(-2);
    }
    goCheckout=()=>{
            this.props.action.replace("/review")
    }
    render() {
     var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
     return(
        <div className="Checkout-Item">
        <div className="Checkout-Title">
            Checkout
         </div>
       
         <div className="Payment-Content">
            <div className="Payment-Content-Left">
            <Status/>
            </div>
            <div className="Payment-Content-Right" >
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
                <div>CONTINUE TO REVIEW</div>
            </div>
        </div>
        <div className="Forward-Buttons-Mobile">
            <div className="Continue-Mobile"  onClick={this.goBack}>
                <div>BACK</div>
            </div>
            <div className="Checkout-Mobile" onClick={this.goCheckout}>
                <div>CONTINUE TO REVIEW</div>
            </div>
        </div>
    </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
