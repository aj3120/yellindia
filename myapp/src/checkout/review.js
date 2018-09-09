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
import { cartProductsAction } from '../actions/cart_products_action'
import { totalPriceAction } from '../actions/total-price-action'
import ShoppingCart from './shopping_cart';
import ShoppingCartMobile from  './shopping_cart_mobile'
const mapStateToProps = (state) => {
    return ({
        cart_products: state.cart_products_reducer.cart_products, checkout_details: state.checkout_details_reducer, total_price: state.cart_products_reducer.total_price,
        login_details: state.login_reducer.login_details, all_products: state.all_products_reducer.all_products
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ go, push, cartProductsAction, totalPriceAction }, dispatch) })
}

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { shipping_method: this.props.shippingMethod, showShoppingCart: 'none', payment_mode: null }
    }
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {
        const price = this.props.total_price;
        const products = this.props.cart_products;
        const address = this.props.checkout_details.address;
        const login_credentials = this.props.login_details;
        const payment_details = this.props.checkout_details.payment_details;
        const shoppingInfo = { login_credentials: login_credentials, price: price, products: products, address: address, payment_details: payment_details }
        sendShoppingInformations(shoppingInfo);
        this.props.action.totalPriceAction(totalPrice);
        this.props.action.cartProductsAction([])
        this.props.action.push("/thanks")
    }
    changeShoppingCartVisibility = () => {
        this.state.showShoppingCart === 'none' ?
            this.setState({ showShoppingCart: 'block' }) :
            this.setState({ showShoppingCart: 'none' })
    }

    paymentMode = (event) => {
        this.setState({ ...this.state, payment_mode: event.target.id })

    }
    shippingMethodChange = (id) => {
        if (id === 'Free') {
            this.setState({ shipping_method: 'Free' })
        }
        else if (id === 'One-Day') {
            this.setState({ shipping_method: 'One-Day' })
        }
        else {
            this.setState({ shipping_method: 'Three-Days' })
        }
    }
    render() {
        let shopping_title = this.state.showShoppingCart === 'none' ? "Show Cart Details" : "Hide Cart Details";
        let shopping_title_img = this.state.showShoppingCart === 'none' ? "/assets/down_arrow.png" : "/assets/up_arrow.png";
        var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
        var productPrice, totalPrice = 0;
        const totalPriceArray = this.props.cart_products.map((product) => {
            productPrice = parseInt(product.count, 10) * parseInt(this.props.all_products.id[product.id].price, 10)
            return (productPrice)
        })
        totalPriceArray.forEach((num) => {
            totalPrice = totalPrice + num;
        })
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
                        <div className="Shopping-Cart-Dropdown-Container">
                            <div className="Shopping-Cart-Dropdown" onClick={this.changeShoppingCartVisibility}>
                                <div><p>{shopping_title}</p></div><div>${totalPrice}</div><div><img src={shopping_title_img} height="20px" /></div>
                            </div>
                            <ShoppingCartMobile showShoppingCart={this.state.showShoppingCart} totalPrice={totalPrice} shipping_method={this.state.shipping_method} />
                        </div>
                        <div className="Review-Content-Right" >
                            <ShoppingCart totalPrice={totalPrice} shipping_method={this.state.shipping_method} shippingMethodChange={this.shippingMethodChange} />
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
                                        <img src="/assets/visa_new.jpg" alt="visa" /><span>{this.props.checkout_details.payment_details.card_number}</span>
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
                                        <p>Subtotal</p> <span>{totalPrice}</span>
                                    </div>
                                    <div className="Review-Shipping">
                                        <p>Shipping</p> <span>FREE</span>
                                    </div>
                                    <div className="Review-ExpectedDelivery">
                                        <p>Expected Delivery</p> <span>Aug 29 - 31 </span>
                                    </div>
                                    <div className="Review-Taxes">
                                        <p>Taxes</p> <span>${parseFloat(totalPrice, 10) * 12 / 100}</span>
                                    </div>
                                    <div className="Review-Total">
                                        <p>Total</p> <span>${parseFloat(totalPrice, 10) + (parseFloat(totalPrice, 10) * 12 / 100)}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="Forward-Buttons">
                        <div className="Continue" onClick={this.goBack}>
                            <div>CONTINUE SHOPPING</div>
                        </div>
                        <div className="Checkout" onClick={() => this.goCheckout(totalPrice)}>
                            <div>COMPLETE ORDER</div>
                        </div>
                    </div>
                    <div className="Forward-Buttons-Mobile">
                        <div className="Continue-Mobile" onClick={this.goBack}>
                            <div>BACK</div>
                        </div>
                        <div className="Checkout-Mobile" onClick={() => this.goCheckout(totalPrice)}>
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
