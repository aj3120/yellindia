import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push, go } from 'react-router-redux';
import CheckoutItem from './item';
import './review.css'
import './shopping-cart.css';
import Status from './status3';
import './status.css';
import sendShoppingInformations from '../services/shopping-informations';
import {cartProductsAction} from '../actions/cart_products_action'
const mapStateToProps = (state) => {
    return ({ cart_products: state.cart_products_reducer.cart_products, checkout_details: state.checkout_details_reducer,total_price:state.cart_products_reducer.total_price,
        login_details:state.login_reducer.login_details})
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ go, push ,cartProductsAction}, dispatch) })
}

class Review extends Component {
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = () => {
        const price=this.props.total_price;
        const products=this.props.cart_products;
        const address=this.props.checkout_details.address;
        const login_credentials=this.props.login_details;
        const payment_details=this.props.checkout_details.payment_details;
        const shoppingInfo={login_credentials:login_credentials,price:price,products:products,address:address,payment_details:payment_details}
        sendShoppingInformations(shoppingInfo);
        this.props.action.cartProductsAction([])
        this.props.action.push("/thanks")
    }
    render() {
        var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
        if (this.props.checkout_details.address !== undefined) {
            return (
                <div className="Checkout-Item">
                    <div className="Checkout-Title">
                        Checkout
             </div>
                    <div className="Review-Content">
                        <div className="Review-Content-Left">
                            <Status />
                        </div>
                        <div className="Review-Content-Right" >
                            <div className="Shipping-Items">
                                <div className="Shopping-Cart">Shopping Cart</div> <div className="Checkout-Count"><div>{this.props.cart_products.length}</div></div>
                            </div>
                            <div className="Divider-Line2">
                            </div>
                            {checkout}
                        </div>
                        <div className="Review-Data">
                            <div className="Review-Shipping-Address">
                                <div className="Shipping-Address-Heading">
                                    <p>Shipping to :</p>
                                </div>
                                <div className="Review-Shipping-Address-Content">
                                    <p>{this.props.checkout_details.address.fullname}</p>
                                    <p>{this.props.checkout_details.address.address}</p>
                                    <p>{this.props.checkout_details.address.building}</p>
                                    <p>{this.props.checkout_details.address.zipcode}</p>
                                    <p>{this.props.checkout_details.address.phone}</p>
                                </div>
                                <div className="Review-Payment-Content">
                                    <div className="Review-Payment-Heading">
                                        <p>Payment Method :</p>
                                    </div>
                                    <div className="Review-Payment-Details">
                                    <img src="/assets/visa_new.jpg" /><span>{this.props.checkout_details.payment_details.card_number}</span>
                                    </div>
                                </div>
                                <div className="Billing-Address">
                                    <div className="Billing-Address-Heading">
                                        <p>Billing Address :</p>
                                    </div>
                                    <div className="Billing-Address-Details">
                                    <p>Same as shipping address</p>
                                    </div>
                                </div>
                                <div className="Divider-Line-Review">
                                </div>
                                <div className="Review-Price">
                                    <div className="Review-Subtotal">
                                    <p>Subtotal</p> <span>{this.props.total_price}</span>
                                    </div>
                                    <div className="Review-Shipping">
                                    <p>Shipping</p> <span>FREE</span>
                                    </div>
                                    <div className="Review-ExpectedDelivery">
                                    <p>Expected Delivery</p> <span>Aug 29 - 31 </span>
                                    </div>
                                    <div className="Review-Taxes">
                                    <p>Taxes</p> <span>${parseFloat(this.props.total_price,10)*12/100}</span>
                                    </div>
                                    <div className="Review-Total">
                                    <p>Total</p> <span>${parseFloat(this.props.total_price,10)+(parseFloat(this.props.total_price,10)*12/100)}</span>
                                    </div>
                                </div>

                            </div>
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
                        <div className="Continue-Mobile" onClick={this.goBack}>
                            <div>BACK</div>
                        </div>
                        <div className="Checkout-Mobile" onClick={this.goCheckout}>
                            <div>COMPLETE ORDER</div>
                        </div>
                    </div>
                </div>

            );
        }
        else {
            return (<h3>Please Enter Shipping and Payment Details</h3>)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
