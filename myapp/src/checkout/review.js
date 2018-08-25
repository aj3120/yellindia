import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {push,go} from 'react-router-redux';
import CheckoutItem from './item';
import './review.css'
import './shopping-cart.css';
import Status from './status3';
import './status.css';

const mapStateToProps = (state) => {
    return ({ cart_products: state.cart_products_reducer.cart_products})
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({go,push}, dispatch) })
}

class Review extends Component {
    goBack=()=>{
        this.props.action.go(-2);
    }
    goCheckout=()=>{
            this.props.action.push("/thanks")
    }
    render() {
    var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
     
     return(
        <div className="Checkout-Item">
        <div className="Checkout-Title">
            Checkout
         </div>
         <div className="Review-Content">
            <div className="Review-Content-Left">
            <Status/>
            </div>
            <div className="Review-Content-Right" >
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
                <div>COMPLETE ORDER</div>
            </div>
        </div>
        <div className="Forward-Buttons-Mobile">
            <div className="Continue-Mobile"  onClick={this.goBack}>
                <div>BACK</div>
            </div>
            <div className="Checkout-Mobile" onClick={this.goCheckout}>
                <div>COMPLETE ORDER</div>
            </div>
        </div>
    </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
