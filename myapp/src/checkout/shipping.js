import React, { Component } from 'react';
import { connect } from 'react-redux';
import './item.css';
import './shipping.css'
import { bindActionCreators } from 'redux';
import { replace, go } from 'react-router-redux';
import CheckoutItem from './item';
import './shopping-cart.css';
import './status.css';
import Status from './status1';
import SocialLogin from '../social-login';
import { addressAction } from '../actions/address-action'
import Modal from 'react-responsive-modal';
import { totalPriceAction } from '../actions/total-price-action'
const mapStateToProps = (state) => {
    return ({
        cart_products: state.cart_products_reducer.cart_products, total_price: state.cart_products_reducer.total_price, all_products: state.all_products_reducer.all_products,
        login_status: state.login_reducer.login_details.status

    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ go, replace, addressAction, totalPriceAction }, dispatch) })
}

class Shipping extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showShoppingCart: 'none', shipping_method: 'Free', shipping_style: { border: "2px solid #2196f3", color: '#2196f3' }, shipping_style_opposite: {
                border: "2px solid gray",
                color: 'gray'
            }, voucher: 'none', voucher_opposite: 'inline-block', fullname: '', address: '', building: '', zipcode: '', phone: '', fullname_visible: 'none',
            address_visible: 'none', zipcode_visible: 'none', phone_visible: 'none', open: false, open_login: false
        }


    }
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {
        if (this.state.fullname === '' || this.state.address === '' || this.state.zipcode === '' || this.state.phone === '') {
            this.inputFieldCheck("fullname_visible");
            this.inputFieldCheck("address_visible");
            this.inputFieldCheck("zipcode_visible");
            this.inputFieldCheck("phone_visible");
        }
        // else if(this.props.login_status===false){
        //     this.onOpenModalForLogin();
        // }
        else {
            this.props.action.addressAction({
                fullname: this.state.fullname, address: this.state.address,
                building: this.state.building, zipcode: this.state.zipcode,
                phone: this.state.phone
            });
            this.props.action.totalPriceAction(totalPrice);
            this.props.action.replace("/payment")
        }


    }
    changeShoppingCartVisibility = () => {
        this.state.showShoppingCart === 'none' ?
            this.setState({ showShoppingCart: 'block' }) :
            this.setState({ showShoppingCart: 'none' })
    }
    onInpuFieldChange = (event) => {
        let pattern_zipcode = /^\s*?[0-9]{0,6}\s*$/
        let pattern_phone = /^\s*?[0-9]{0,10}\s*$/
        let field = event.target.id.split('_')[0]
        if (field == 'zipcode') {
            if (event.target.value === '') {
                this.setState({ [event.target.id]: 'block', [field]: event.target.value });
            }
            else if (pattern_zipcode.test(event.target.value)) {
                this.setState({ [event.target.id]: 'none', [field]: event.target.value });
            }
            else {
                this.setState({ [event.target.id]: 'none' });
            }
        }
        else if (field == 'phone') {
            if (event.target.value === '') {
                this.setState({ [event.target.id]: 'block', [field]: event.target.value });
            }
            else if (pattern_phone.test(event.target.value)) {
                this.setState({ [event.target.id]: 'none', [field]: event.target.value });
            }
            else {
                this.setState({ [event.target.id]: 'none' });
            }
        }
        else {
            if (event.target.value === '') {
                this.setState({ [event.target.id]: 'block', [field]: event.target.value });
            }
            else {
                this.setState({ [event.target.id]: 'none', [field]: event.target.value });
            }
        }


    }
    inputFieldCheck = (id) => {
        let field = id.split('_')[0]
        if (this.state[field] === '') {
            this.setState({ [id]: 'block' });
        }
        else {
            this.setState({ [id]: 'none' });
        }


    }
    openVocuherBox = () => {
        this.state.voucher === 'none' ? this.setState({ voucher: 'inline-block', voucher_opposite: 'none' }) : this.setState({ voucher: 'none', voucher_opposite: 'inline-block' })
    }
    freeShipping = () => {
        this.setState({ shipping_method: 'Free' })
    }

    ondayShipping = () => {
        this.setState({ shipping_method: 'One-Day' })
    }
    threedayShipping = () => {
        this.setState({ shipping_method: 'Three-Days' })
    }
    render() {
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
        let questionBoxStyleFree = this.state.shipping_method === 'Free' ? this.state.shipping_style : this.state.shipping_style_opposite;
        let questionBoxStyleThreeDay = this.state.shipping_method === 'Three-Days' ? this.state.shipping_style : this.state.shipping_style_opposite;
        let questionBoxStyleOneDay = this.state.shipping_method === 'One-Day' ? this.state.shipping_style : this.state.shipping_style_opposite;
        return (
            <div className="Checkout-Item">
                <div className="Checkout-Title">
                    <p>Checkout</p>
                </div>


                <div className="Shipping-Content">
                    <div className="Checkout-Status-Container">
                        <Status />
                    </div>
                    <div className="Shopping-Cart-Dropdown-Container">
                    <div className="Shopping-Cart-Dropdown" onClick={this.changeShoppingCartVisibility}>
                        <div><p>Shopping Cart</p></div><div>${totalPrice}</div><div>asdas<i className="up" /><i className="down" /></div>
                    </div>
                    <div className="Shopping-Cart-DropList" style={{ display: this.state.showShoppingCart }}>
                        <div className="Shopping-Cart-DropList-Items">
                            {checkout}
                         </div>   
                         <div className="Voucher" >
                         asdasdasd
                         asdasdasdasd
                         asdasd
                           </div>
                         
                    </div>
                    </div>
                    <div className="Shipping-Content-Right"  >
                        <div className="Shipping-Items">
                            <div className="Shopping-Cart">Shopping Cart</div> <div className="Checkout-Count"><div>{this.props.cart_products.length}</div></div>
                        </div>
                        <div className="Divider-Line2">
                        </div>
                        <div className="Shipping-Items-List">
                            {checkout}
                        </div>
                        <div className="Divider-Line2">
                        </div>
                        <div className="Voucher" >
                            <div className="Voucher-Heading" onClick={this.openVocuherBox}><p> Have Voucher?</p><i className="up" style={{ display: this.state.voucher }} /><i className="down" style={{ display: this.state.voucher_opposite }} /></div>
                            <div><input type="text" placeholder="Voucher Number" style={{ display: this.state.voucher }} /></div>
                        </div>


                        <div className="Divider-Line2">
                        </div>
                        <div className="Shipping-Price-Calculations">
                            <div className="Shipping-Subtotal">
                                <div className="Shipping-Subtotal-Heading">
                                    <p>Subtotal</p>
                                </div>
                                <div className="Shipping-Subtotal-Value">
                                    ${totalPrice}
                                </div>
                            </div>
                            <div className="Shipping-Type">
                                <div className="Shipping-Type-Heading">
                                    <p>Shipping</p>
                                </div>
                                <div className="Shipping-Type-Value">
                                    <p>{this.state.shipping_method}</p>
                                </div>
                            </div>
                        </div>
                        <div className="Divider-Line2">
                        </div>
                        <div className="Shipping-Calculated-Price">

                            <div className="Shipping-Total">
                                <div className="Shipping-Total-Heading">
                                    <p>Total</p>
                                </div>
                                <div className="Shipping-Total-Value">
                                    ${totalPrice}
                                </div>
                            </div>
                        </div>
                        <div className="Shipping-Method">
                            <div className="Shipping-Method-Heading">
                                <p>Shipping Method</p>
                            </div>
                            <div className="Free" onClick={this.freeShipping}>
                                <div className="Question-Mark-Selection" style={questionBoxStyleFree}>?</div><div>FreeFedEx Ground shipping </div> <div id="free">Free</div>
                            </div>
                            <div className="Three-Day" onClick={this.threedayShipping}>
                                <div className="Question-Mark-Selection" style={questionBoxStyleThreeDay}>?</div><div>FedEx Ground Shipping. 2-3 business days after processing. </div> <div id="free">$5.99</div>
                            </div>
                            <div className="One-Day" onClick={this.ondayShipping}>
                                <div className="Question-Mark-Selection" style={questionBoxStyleOneDay}>?</div><span>FedEx One-Day Shipping </span> <div id="free">$17.50</div>
                            </div>
                        </div>
                    </div>
                    <div className="Shipping-Content-Left">


                        <div className="Shipping-Login">
                            <p>Login-With</p>
                            <div className="Social-Container">
                                <SocialLogin callFrom={"shipping"} />
                            </div>
                        </div>
                        <div className="FullName">
                            <p>Full Name</p>
                            <div className="FullName-Box">
                                <input id="fullname_visible" type="text" placeholder="Enter Your Name" onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("fullname_visible")} value={this.state.fullname} />
                                <div className="Error-In-Input" style={{ display: this.state.fullname_visible }}>Please Enter Your Name</div>
                            </div>

                        </div>
                        <div className="StreetAddress">
                            <p>Street Address</p>
                            <div className="StreetAddress-Box">
                                <input id="address_visible" type="text" placeholder="Enter Your Address" onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("address_visible")} required value={this.state.address} />
                                <div className="Error-In-Input" style={{ display: this.state.address_visible }}>Please Enter Address</div>
                            </div>

                        </div>
                        <div className="Building">
                            <p>Apt, Suite, Bldg (optional)</p>
                            <div className="Building-Box">
                                <input id="building_visible" type="text" placeholder="Optional" value={this.state.building} onChange={this.onInpuFieldChange} />
                            </div>
                        </div>
                        <div className="ZipCode">
                            <p>Zip Code</p>
                            <div className="ZipCode-Box">
                                <input id="zipcode_visible" type="text" placeholder="Enter Zipcode" required value={this.state.zipcode} onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("zipcode_visible")} />
                                <div className="Error-In-Input" style={{ display: this.state.zipcode_visible }}>Please Enter Zipcode</div>
                            </div>

                        </div>
                        <div className="PhoneNumber">
                            <p>Phone Number</p>
                            <div className="PhoneNumber-Box">
                                <input id="phone_visible" type="text" placeholder="Enter phone number" value={this.state.phone} onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("phone_visible")} />
                                <div className="Error-In-Input" style={{ display: this.state.phone_visible }}>Please Enter your phone number</div>
                            </div>

                        </div>
                    </div>

                </div>


                <div className="Forward-Buttons">
                    <div className="Continue" onClick={this.goBack}>
                        <div>CONTINUE SHOPPING</div>
                    </div>
                    <div className="Checkout" onClick={() => this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO PAYMENT</div>
                    </div>
                </div>
                <div className="Forward-Buttons-Mobile">
                    <div className="Continue-Mobile" onClick={this.goBack}>
                        <div>BACK</div>
                    </div>
                    <div className="Checkout-Mobile" onClick={() => this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO PAYMENT</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
