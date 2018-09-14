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
import { paymentModeAction } from '../actions/payment-details-action';
import { paymentDetailsAction } from '../actions/payment-details-action';
import ShoppingCart from './shopping_cart'
import ShoppingCartMobile from './shopping_cart_mobile'
import { shippingMethodAction } from '../actions/shipping_method_action';
import CreditCard from './credit_card';
import CreditCardInput from 'react-credit-card-input';
const mapStateToProps = (state) => {
    return ({
        cart_products: state.cart_products_reducer.cart_products, total_price: state.cart_products_reducer.total_price, all_products: state.all_products_reducer.all_products,
        shippingMethod: state.app_helper_reducer.shippingMethod
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ replace, go, totalPriceAction, paymentDetailsAction, shippingMethodAction,paymentModeAction }, dispatch) })
}

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { shipping_method: this.props.shippingMethod, showShoppingCart: 'none', payment_mode: null, card_number: '', date: '', cvv: '', error_visibility: 'hidden' }
        this.month_ref = React.createRef();
        this.cvv_ref = React.createRef();
        this.error_ref = React.createRef();
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }


    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {
        if (this.state.payment_mode === null) {
            this.setState({ error_visibility: 'visible' })
            window.scrollTo(0, this.error_ref.current)
        }
        else {
            this.props.action.replace("/review")
            this.props.action.totalPriceAction(totalPrice);
            this.props.action.shippingMethodAction(this.state.shipping_method)
            const paymentDetails = { card_number: this.state.card_number, date: this.state.date, cvv: this.state.cvv }
            this.props.action.paymentDetailsAction(paymentDetails);
            this.props.action.paymentModeAction(this.state.payment_mode);
        }

    }
    goCheckoutMobile = (totalPrice) => {
        if (this.state.payment_mode === null) {
            this.setState({ error_visibility: 'visible' })
            window.scrollTo(0, this.error_ref.current)
        }
        else {
            this.props.action.replace("/review")
            this.props.action.totalPriceAction(totalPrice);
            this.props.action.shippingMethodAction(this.state.shipping_method)
            this.props.action.paymentModeAction(this.state.payment_mode);
        }

    }
    formChange = (event) => {
        if (event.target.id === "card-number") {
            this.setState({ ...this.state, card_number: event.target.value })
        }
        else if (event.target.id === "card-expiry") {

            this.setState({ ...this.state, date: event.target.value })

        }
        else if (event.target.id === "cvc") {

            this.setState({ ...this.state, cvv: event.target.value })

        }
    }

    changeShoppingCartVisibility = () => {
        this.state.showShoppingCart === 'none' ?
            this.setState({ showShoppingCart: 'block' }) :
            this.setState({ showShoppingCart: 'none' })
    }

    paymentMode = (event) => {
        if (event.target.id === "card-number" || event.target.id === "card-expiry" || event.target.id === "cvc" || event.target.id === 'first-part'|| event.target.id === 'second-part'|| event.target.id === 'third-part'||
                                        event.target.id === 'month-part1'||event.target.id === 'month-part2'||event.target.id === 'cvv') {
            this.setState({ ...this.state, payment_mode: 'credit' })
        }
        else {
            this.setState({ ...this.state, payment_mode: event.target.id })
        }


    }
    paymentModeForCredit = (id) => {
        this.setState({ ...this.state, payment_mode: 'credit' })
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
        const shopping_title = this.state.showShoppingCart === 'none' ? "Show Cart Details" : "Hide Cart Details";
        const shopping_title_img = this.state.showShoppingCart === 'none' ? "/assets/down_arrow.png" : "/assets/up_arrow.png";
        const payment_mode_paypal_style = this.state.payment_mode === 'paypal' ? { border: 'solid 1px #2196f3' } : { border: 'solid 1px #90a4ae' }
        const payment_mode_apple_style = this.state.payment_mode === 'applepay' ? { border: 'solid 1px #2196f3' } : { border: 'solid 1px #90a4ae' }
        const payment_mode_credit_style = this.state.payment_mode === 'credit' ? { border: 'solid 1px #2196f3' } : { border: 'solid 1px #90a4ae' }
        const payment_mode_paypal_radio_image = this.state.payment_mode === 'paypal' ? "/assets/radio-active.svg" : "/assets/radio-inactive.svg"
        const payment_mode_credit_radio_image = this.state.payment_mode === 'credit' ? "/assets/radio-active.svg" : "/assets/radio-inactive.svg"
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
                <div className="Checkout-Title">
                    Checkout
                </div>

                <div className="Payment-Content">
                    <div className="Checkout-Status-Container">
                        <StatusView />
                    </div>
                    <div className="Shopping-Cart-Dropdown-Container">
                        <div className="Shopping-Cart-Dropdown" onClick={this.changeShoppingCartVisibility}>
                            <div><p>{shopping_title}</p></div><div><span>${totalPrice}</span><img src={shopping_title_img} height="20px" /></div>
                        </div>
                        <ShoppingCartMobile showShoppingCart={this.state.showShoppingCart} totalPrice={totalPrice} shipping_method={this.state.shipping_method} />
                    </div>
                    <div className="Payment-Content-Right"  >
                        <ShoppingCart totalPrice={totalPrice} shipping_method={this.state.shipping_method} shippingMethodChange={this.shippingMethodChange} />
                    </div>
                    <div className="Payment-Content-Left">
                        <div className="Credit-Card" id="credit" onClick={this.paymentMode} style={payment_mode_credit_style}>
                            <div className="Credit-Card-Heading" id="credit" onClick={this.paymentMode}>
                                <div className="Credit-Card-Heading-Name" id="credit">
                                    <div id="credit" onClick={this.paymentMode} />
                                    <img src={payment_mode_credit_radio_image} alt="radio" height='18px' id="credit" onClick={this.paymentMode} />
                                    <span id="credit" onClick={this.paymentMode}>Credit Card</span>
                                </div>
                                <div className="Credit-Card-Heading-Image">
                                    <img src="assets/master.svg" alt="master" /> <img src="assets/visa.svg" alt="visa" /><img src="assets/amex.svg" alt="amex" />
                                </div>
                            </div>
                            <div className="Credit-Card-Description">
                                <p id="credit" onClick={this.paymentMode}>Safe money transfer using your bank account. Visa, Maestro, Discover, American Express.</p>
                            </div>
                            <div className="Credit-Card-Number">
                                <div className="Credit-Card-Number-Box">
                                    <CreditCardInput
                                        cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
                                            <input
                                                {...props}
                                                onClick={this.paymentMode}
                                                onChange={handleCardCVCChange(e => this.formChange(e))}
                                            />
                                        )}
                                        cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
                                            <input
                                                {...props}
                                                onClick={this.paymentMode}
                                                onChange={handleCardExpiryChange(e =>
                                                    this.formChange(e))}
                                            />
                                        )}
                                        cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
                                            <input
                                                {...props}
                                                onClick={this.paymentMode}
                                                onChange={handleCardNumberChange(e =>
                                                    this.formChange(e))}
                                            />
                                        )}
                                    />

                                </div>

                                <div className="Credit-Card-Number-Label">
                                    <p>Enter card number, expiration date & CVV number</p>
                                </div>

                            </div>

                        </div>
                        <div id="paypal" className="PayPal" style={payment_mode_paypal_style} onClick={this.paymentMode}>

                            <div id="paypal" className="PayPal-Heading">
                                <div id="paypal" className="PayPal-Heading-Name">
                                    <div id="paypal" onClick={this.paymentMode} />
                                    <img src={payment_mode_paypal_radio_image} alt="radio" height='18px' id="paypal" onClick={this.paymentMode} />
                                    <span id="paypal" onClick={this.paymentMode}>Paypal</span>
                                </div>
                                <div className="PayPal-Heading-Image" id="paypal" onClick={this.paymentMode}>
                                    <img src="assets/paypal.jpg" alt="paypal" id="paypal" onClick={this.paymentMode} />
                                </div>
                            </div>
                            <div className="PayPal-Description">
                                <p id="paypal" onClick={this.paymentMode}>You will be redirected to PayPal website to complete your purchase securely</p>
                            </div>

                        </div>
                        <div className="Error-Payment" style={{ visibility: this.state.error_visibility }}>
                            <p type="text" ref={this.error_ref}>Please choose a payment mode</p>
                        </div>
                    </div>
                    <div className="Payment-Mobile">
                        <div>
                            <CreditCard credit_box_style={payment_mode_credit_style} paymentMode={this.paymentMode} />
                        </div>
                        <div className="Payment-Mobile-Paypal" id="paypal" onClick={this.paymentMode} style={payment_mode_paypal_style}>
                            <div><img id="paypal" src="/assets/paypal-black.svg" height="20px" /></div>
                            <div><p id="paypal">PAYPAL</p></div>
                        </div>
                        <div className="Payment-Mobile-ApplePay" id="applepay" onClick={this.paymentMode} style={payment_mode_apple_style}>
                            <div><img src="/assets/apple-black.svg" id="applepay" height="20px" /></div>
                            <div><p id="applepay" >APPLE PAY</p></div>
                        </div>
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
                    <div className="Checkout-Mobile" onClick={() => this.goCheckoutMobile(totalPrice)}>
                        <div>CONTINUE TO REVIEW</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
