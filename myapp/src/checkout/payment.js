import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace, go } from 'react-router-redux';
import CheckoutItem from './item';
import './shopping-cart.css';
import Status from './status2';
import './payment.css'
import './status.css';
import './checkout.css';
import { totalPriceAction } from '../actions/total-price-action';
import { paymentDetailsAction } from '../actions/payment-details-action';
const mapStateToProps = (state) => {
    return ({ cart_products: state.cart_products_reducer.cart_products, total_price: state.cart_products_reducer.total_price, all_products: state.all_products_reducer.all_products })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ replace, go, totalPriceAction,paymentDetailsAction}, dispatch) })
}

class Payment extends Component {
    constructor(props) {
        super(props);
        if (window.innerWidth < 768) {
            this.state = { showShoppingCart: 'none',payment_mode:null,card_number:'',date:'',cvv:''}
        }
        else {
            this.state = { showShoppingCart: 'block',payment_mode:null,card_number:'',date:'',cvv:'' }
        }

    }
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {
        
        if(this.state.payment_mode===null && (this.state.card_number===''||this.state.date===''||this.state.cvv==='')&&(this.state.payment_mode!=='paypal'))
        {
            alert("Please Enter Details");
        }
        else{
            this.props.action.replace("/review")
            this.props.action.totalPriceAction(totalPrice);
            let paymentDetails={card_number:this.state.card_number,date:this.state.date,cvv:this.state.cvv}
            this.props.action.paymentDetailsAction(paymentDetails);
        }
        
    }
    changeShoppingCartVisibility = () => {
        this.state.showShoppingCart === 'none' ?
            this.setState({ showShoppingCart: 'block' }) :
            this.setState({ showShoppingCart: 'none' })
    }

    paymentMode=(event)=>{
        this.setState({...this.state,payment_mode:event.target.id})
        
    }
    formChange=(event)=>{
        if(event.target.id==="cardnumber"){
            this.setState({...this.state,card_number:event.target.value})
        }
        else if(event.target.id==="date"){
            this.setState({...this.state,date:event.target.value})
        }
        else if(event.target.id==="cvv"){
            this.setState({...this.state,cvv:event.target.value})
        }
    }

    render() {
        var productPrice, totalPrice = 0;
        let totalPriceArray = this.props.cart_products.map((product) => {
            productPrice = parseInt(product.count, 10) * parseInt(this.props.all_products.id[product.id].price, 10)
            return (productPrice)
        })
        totalPriceArray.forEach((num) => {
            totalPrice = totalPrice + num;
        })
        var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
        return (
            <div className="Checkout-Item">
                <div className="Checkout-Title">
                    Checkout
                </div>

                <div className="Payment-Content">
                    <div className="Checkout-Status-Container">
                        <Status />
                    </div>
                    <div className="Shopping-Cart-Dropdown" onClick={this.changeShoppingCartVisibility}>
                        <div><p>Shopping Cart</p></div><div>${totalPrice}</div>
                    </div>
                    <div className="Payment-Content-Right" style={{ display: this.state.showShoppingCart }} >
                        <div className="Shipping-Items">
                            <div className="Shopping-Cart">Shopping Cart</div> <div className="Checkout-Count"><div>{this.props.cart_products.length}</div></div>
                        </div>
                        <div className="Divider-Line2">
                        </div>
                        {checkout}
                    </div>
                    <div className="Payment-Content-Left">
                        <div className="Credit-Card">
                            <div className="Credit-Card-Heading">
                                <div className="Credit-Card-Heading-Name">
                                    <input type="radio" id="credit" onClick={this.paymentMode}/>
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
                                    <input type="text" id="date" value={this.state.date} placeholder="MM/YY"  onChange={this.formChange}/>
                                    <input type="text" id="cvv" value={this.state.cvv} placeholder="CVV"  onChange={this.formChange}/>
                                </div>

                                <div className="Credit-Card-Number-Label">
                                    <p>Enter card number, expiration date & CVV number</p>
                                </div>

                            </div>
                        </div>
                        <div className="PayPal">

                            <div className="PayPal-Heading">
                                <div className="PayPal-Heading-Name">
                                    <input type="radio" id="paypal" onClick={this.paymentMode}/><span>PayPal</span>
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
