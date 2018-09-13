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
        login_details: state.login_reducer.login_details, all_products: state.all_products_reducer.all_products,shippingMethod: state.app_helper_reducer.shippingMethod,
        paymentMode:state.checkout_details_reducer.payment_mode
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ go, push, cartProductsAction, totalPriceAction }, dispatch) })
}

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { shipping_method: this.props.shippingMethod, showShoppingCart: 'none', payment_mode: this.props.paymentMode,edit_shipping:'none',edit_shipping_opposite:'block',
                        fullname:this.props.checkout_details.address.fullname,address:this.props.checkout_details.address.address,building:this.props.checkout_details.address.building,
                        zipcode:this.props.checkout_details.address.zipcode,phone:this.props.checkout_details.address.phone
                    }
    }
    componentWillMount(){
        window.scrollTo(0,0)
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
    editShippingEnable=()=>{
        this.state.edit_shipping==='none'?this.setState({edit_shipping:'block',edit_shipping_opposite:'none'}):this.setState({edit_shipping:'none',edit_shipping_opposite:'block'})
        
    }
    formChangeHandler=(event)=>{
        this.setState({[event.target.id]:event.target.value})
    }
    render() {
        let shopping_title = this.state.showShoppingCart === 'none' ? "Show Cart Details" : "Hide Cart Details";
        let shopping_title_img = this.state.showShoppingCart === 'none' ? "/assets/down_arrow.png" : "/assets/up_arrow.png";
        let shopping_cart_mobile_view=window.innerWidth<768?'block':'none';
        var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
        var productPrice, subTotal = 0, totalPrice = 0;
        let email=this.props.login_details.email===undefined? 'aj3120@gmail.com' : this.props.login_details.email
        
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


        
        var payment_content
        var payment_image
        if(this.state.payment_mode==='credit'){
            payment_content=this.props.checkout_details.payment_details.card_number
            payment_image='/assets/visa_new.jpg'
        }
        else if(this.state.payment_mode==='paypal'){
            payment_content='Paypal'
            payment_image='/assets/paypal-black.svg'
        }
        else if(this.state.payment_mode==='applepay'){
            payment_content='Applepay'
            payment_image='/assets/apple-black.svg'
        }

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
                            
                            <ShoppingCartMobile showShoppingCart={shopping_cart_mobile_view} showPriceCalculations={'none'} totalPrice={totalPrice} shipping_method={this.state.shipping_method} />
                            <div className="Order-Confirmation" style={{display:shopping_cart_mobile_view}}>
                                <p id="Order-Confirmation-Heading">Order confirmation sent to:</p>
                                <p id="Order-Confirmation-Email">{email}</p>
                            </div>
                        </div>
                        <div className="Review-Content-Right" >
                            <ShoppingCart totalPrice={totalPrice} showPriceCalculations={'none'} shipping_method={this.state.shipping_method} shippingMethodChange={this.shippingMethodChange} />
                            <div className="Order-Confirmation">
                                <p id="Order-Confirmation-Heading">Order confirmation sent to</p>
                                <p id="Order-Confirmation-Email">{email}</p>
                            </div>
                       </div>
                        <div className="Review-Data">
                            <div className="Review-Shipping-Address">
                                <div className="Shipping-Address-Heading">
                                    <p>Shipping to :</p><img src='/assets/edit.svg' alt="Edit" onClick={this.editShippingEnable}/>
                                </div>
                                <div className="Review-Shipping-Address-Content" style={{display:this.state.edit_shipping_opposite}}>
                                    <p>{this.state.fullname}</p>
                                    <p>{this.state.address}</p>
                                    <p>{this.state.building}</p>
                                    <p>{this.state.zipcode}</p>
                                    <p>{this.state.phone}</p>
                                </div>
                                <div className="Review-Shipping-Address-Content-Edit" style={{display:this.state.edit_shipping}}>
                                <div className="Review-Shipping-Address-Content-Edit-Input" >
                                    <div> <input id="fullname" type="text" value={this.state.fullname} onChange={this.formChangeHandler}/></div>
                                    <div><input  id="address" type="text" value={this.state.address} onChange={this.formChangeHandler}/></div>
                                    <div><input id="building" type="text" value={this.state.building} onChange={this.formChangeHandler} /></div>
                                    <div><input id="zipcode" type="number" value={this.state.zipcode} onChange={this.formChangeHandler} /></div>
                                    <div><input id="phone" type="number"value={this.state.phone} onChange={this.formChangeHandler} /></div>
                                </div>
                                <div className="Shipping-Change-Button" onClick={this.editShippingEnable}>
                                    CHANGE
                                </div>
                                </div>
                                
                                <div className="Review-Payment-Content">
                                    <div className="Review-Payment-Heading">
                                        <p>Shipping to :</p><img src='/assets/edit.svg' alt="Edit" onClick={()=>this.props.action.push('/payment')}/>
                                    </div>
                                    <div className="Review-Payment-Details">
                                        <img src={payment_image} height="20px" alt="visa" /><span>{payment_content}</span>
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
                                        <p>Shipping</p> <span>{this.state.shipping_method}</span>
                                    </div>
                                    <div className="Review-ExpectedDelivery">
                                        <p>Expected Delivery</p> <span>Aug 29 - 31 </span>
                                    </div>
                                    <div className="Review-Taxes">
                                        <p>Taxes</p> <span>${(parseFloat(totalPrice, 10) * 12 / 100).toFixed(2)}</span>
                                    </div>
                                    <div className="Review-Total">
                                        <p>Total</p> <span>${(parseFloat(totalPrice, 10) + (parseFloat(totalPrice, 10) * 12 / 100)).toFixed(2)}</span>
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
