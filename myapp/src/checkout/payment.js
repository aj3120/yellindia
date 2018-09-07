import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace, go } from 'react-router-redux';
import CheckoutItem from './item';
import './shopping-cart.css';
import StatusView from './status2';
import './payment.css'
import './status.css';
import './checkout.css';
import { totalPriceAction } from '../actions/total-price-action';
import { paymentDetailsAction } from '../actions/payment-details-action';
import Modal from 'react-responsive-modal';
import ShoppingCart from './shopping_cart'
import ShoppingCartMobile from './shopping_cart_mobile'
import { shippingMethodAction } from '../actions/shipping_method_action';
import CreditCard from './credit_card';
const mapStateToProps = (state) => {
    return ({
        cart_products: state.cart_products_reducer.cart_products, total_price: state.cart_products_reducer.total_price, all_products: state.all_products_reducer.all_products,
        shippingMethod: state.app_helper_reducer.shippingMethod
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ replace, go, totalPriceAction, paymentDetailsAction, shippingMethodAction }, dispatch) })
}

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { shipping_method: this.props.shippingMethod, showShoppingCart: 'none', payment_mode: null, card_number: '', date: '', cvv: '', open: false }
    }



    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {

        if (this.state.payment_mode === null && (this.state.card_number === '' || this.state.cvv === '') && (this.state.payment_mode !== 'paypal')) {
            this.onOpenModal();
        }
        else {
            this.props.action.replace("/review")
            this.props.action.totalPriceAction(totalPrice);
            this.props.action.shippingMethodAction(this.state.shipping_method)
            const paymentDetails = { card_number: this.state.card_number, date: this.state.date, cvv: this.state.cvv }
            this.props.action.paymentDetailsAction(paymentDetails);
        }

    }
    changeShoppingCartVisibility = () => {
        this.state.showShoppingCart === 'none' ?
            this.setState({ showShoppingCart: 'block' }) :
            this.setState({ showShoppingCart: 'none' })
    }

    paymentMode = (event) => {
        this.setState({ ...this.state, payment_mode: event.target.id })

    }
    formChange = (event) => {
        if (event.target.id === "cardnumber") {
            let pattern = /^\s*?[0-9]{1,12}\s*$/
            if (pattern.test(event.target.value) || event.target.value === "") {
                this.setState({ ...this.state, card_number: event.target.value })
            }

        }
        else if (event.target.id === "date") {
            let pattern = /^\s*?[0-9]{1,6}\s*$/
            if (pattern.test(event.target.value) || event.target.value === "") {
                this.setState({ ...this.state, date: event.target.value })
            }

        }
        else if (event.target.id === "cvv") {
            let pattern = /^\s*?[0-9]{1,3}\s*$/
            if (pattern.test(event.target.value) || event.target.value === "") {
                this.setState({ ...this.state, cvv: event.target.value })
            }
        }
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
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
        var productPrice, subTotal = 0, totalPrice = 0;
        const totalPriceArray = this.props.cart_products.map((product) => {
            productPrice = parseInt(product.count, 10) * parseInt(this.props.all_products.id[product.id].price, 10)
            return (productPrice)
        })
        totalPriceArray.forEach((num) => {
            subTotal = subTotal + num;
        })
        if (this.state.shipping_method === 'Free') {
            totalPrice = subTotal;
        }
        else if (this.state.shipping_method === 'One-Day') {
            totalPrice = parseFloat(subTotal, 10) + 17.50
        }
        else {
            totalPrice = parseFloat(subTotal, 10) + 5.99
        }

        var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
        return (
            <div className="Checkout-Item">
                <Modal open={this.state.open} onOpen={this.onOpenModal} onClose={this.onCloseModal} center>
                    <h2>Error</h2>
                    <p>Please Enter the details</p>
                </Modal>

                <div className="Checkout-Title">
                    Checkout
                </div>

                <div className="Payment-Content">
                    <div className="Checkout-Status-Container">
                        <StatusView />
                    </div>
                    <div className="Shopping-Cart-Dropdown-Container">
                        <div className="Shopping-Cart-Dropdown" onClick={this.changeShoppingCartVisibility}>
                            <div><p>{shopping_title}</p></div><div>${totalPrice}</div><div><img src={shopping_title_img} height="20px" /></div>
                        </div>
                        <ShoppingCartMobile showShoppingCart={this.state.showShoppingCart} totalPrice={totalPrice} shipping_method={this.state.shipping_method} />
                    </div>
                    <div className="Payment-Content-Right"  >
                        <ShoppingCart totalPrice={totalPrice} shipping_method={this.state.shipping_method} shippingMethodChange={this.shippingMethodChange} />
                    </div>
                    <div className="Payment-Content-Left">
                        <div className="Credit-Card">
                            <div className="Credit-Card-Heading">
                                <div className="Credit-Card-Heading-Name">
                                    <input type="radio" name="payment" id="credit" onClick={this.paymentMode} />
                                    <span>Credit Card</span>
                                </div>
                                <div className="Credit-Card-Heading-Image">
                                    <img src="assets/master.svg" alt="master" /> <img src="assets/visa.svg" alt="visa" /><img src="assets/amex.svg" alt="amex" />
                                </div>
                            </div>
                            <div className="Credit-Card-Description">
                                <p>Safe money transfer using your bank account. Visa, Maestro, Discover, American Express.</p>
                            </div>
                            <div className="Credit-Card-Number">
                                <div className="Credit-Card-Number-Box">
                                    <img src="assets/placeholder.svg" alt="placeholder" />
                                    <input type="text" id="cardnumber" value={this.state.card_number} placeholder="1234 5678 9012 3456" onChange={this.formChange} />
                                    <input type="text" id="date" value={this.state.date} placeholder="MM/YY" onChange={this.formChange} />
                                    <input type="text" id="cvv" value={this.state.cvv} placeholder="CVV" onChange={this.formChange} />
                                </div>

                                <div className="Credit-Card-Number-Label">
                                    <p>Enter card number, expiration date & CVV number</p>
                                </div>

                            </div>
                        </div>
                        <div className="PayPal">

                            <div className="PayPal-Heading">
                                <div className="PayPal-Heading-Name">
                                    <input type="radio" name="payment" id="paypal" onClick={this.paymentMode} /><span>PayPal</span>
                                </div>
                                <div className="PayPal-Heading-Image">
                                    <img src="assets/paypal.jpg" alt="paypal" />
                                </div>
                            </div>
                            <div className="PayPal-Description">
                                <p>You will be redirected to PayPal website to complete your purchase securely</p>
                            </div>

                        </div>
                    </div>
                    <div className="Payment-Mobile">
                        <CreditCard/>
                    </div>

                </div>

                <div className="Forward-Buttons">
                    <div className="Continue" onClick={this.goBack}>
                        <div>CONTINUE SHOPPING</div>
                    </div>
                    <div className="Checkout" onClick={() => this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO REVIEW</div>
                    </div>
                </div>
                <div className="Forward-Buttons-Mobile">
                    <div className="Continue-Mobile" onClick={this.goBack}>
                        <div>BACK</div>
                    </div>
                    <div className="Checkout-Mobile" onClick={() => this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO REVIEW</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
