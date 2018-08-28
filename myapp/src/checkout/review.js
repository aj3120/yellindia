import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push, go } from 'react-router-redux';
import CheckoutItem from './item';
import './review.css'
import './shopping-cart.css';
import Status from './status3';
import './status.css';

const mapStateToProps = (state) => {
    return ({ cart_products: state.cart_products_reducer.cart_products, checkout_details: state.checkout_details_reducer })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ go, push }, dispatch) })
}

class Review extends Component {
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = () => {
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
                                    <p>Subtotal</p>
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
