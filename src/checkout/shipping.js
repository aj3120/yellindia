import React, { Component } from 'react';
import { connect } from 'react-redux';
import './item.css';
import './shipping.css'
import { bindActionCreators } from 'redux';
import { replace, go } from 'react-router-redux';
import './shopping-cart.css';
import './status.css';
import Status from './status1';
import SocialLogin from '../social-login';
import { addressAction } from '../actions/address-action'
import { totalPriceAction } from '../actions/total-price-action';
import ShoppingCart from './shopping_cart'
import ShoppingCartMobile from './shopping_cart_mobile';
import {shippingMethodAction} from '../actions/shipping_method_action';
const mapStateToProps = (state) => {
    return ({
        cart_products: state.cart_products_reducer.cart_products, total_price: state.cart_products_reducer.total_price, all_products: state.all_products_reducer.all_products,
        login_status: state.login_reducer.login_details.status,shippingMethod:state.app_helper_reducer.shippingMethod

    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ go, replace, addressAction, totalPriceAction,shippingMethodAction}, dispatch) })
}

class Shipping extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shipping_method:  this.props.shippingMethod, 
            showShoppingCart: 'none',fullname: '', address: '', building: '', zipcode: '', phone: '', fullname_visible: 'none',
            address_visible: 'none', zipcode_visible: 'none', phone_visible: 'none', open: false, open_login: false
        }
        this.fullname_visible_ref=React.createRef();
        this.address_visible_ref=React.createRef();
        this.zipcode_visible_ref=React.createRef();
        this.phone_visible_ref=React.createRef();

        


    }
    componentDidMount(){
        window.scrollTo(0,0);
    }
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {
        if (this.state.fullname === '' || this.state.address === '' || this.state.zipcode === '' || this.state.phone === '') {
          this.inputFieldCheck('fullname_visible')
          this.inputFieldCheck('address_visible')
          this.inputFieldCheck('zipcode_visible')
          this.inputFieldCheck('phone_visible')
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
            this.props.action.shippingMethodAction(this.state.shipping_method)
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
        const pattern_zipcode = /^\s*?[0-9]{0,6}\s*$/
        const pattern_phone = /^\s*?[0-9]{0,10}\s*$/
        const field = event.target.id.split('_')[0]
        if (field === 'zipcode') {
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
        else if (field === 'phone') {
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
        const field = id.split('_')[0]
        if (this.state[field] === '') {
            this.setState({ [id]: 'block' });
        }
        else {
            this.setState({ [id]: 'none' });
        }


    }
    shippingMethodChange=(id)=>{
        if(id==='Free'){
            this.setState({ shipping_method: 'Free' })
        }
        else if(id==='One-Day'){
            this.setState({ shipping_method: 'One-Day' })
        }
        else{
            this.setState({ shipping_method: 'Three-Days' })
        }
    }
    
    render() {
        const shopping_title=this.state.showShoppingCart==='none'?"Show Cart Details":"Hide Cart Details";
        const shopping_title_img=this.state.showShoppingCart==='none'?"/assets/down_arrow.png":"/assets/up_arrow.png";
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
                            <div><p>{shopping_title}</p></div><div>${totalPrice}</div><div><img src={shopping_title_img} height="20px" alt="shopping title"/></div>
                        </div>
                        <ShoppingCartMobile showShoppingCart={this.state.showShoppingCart} totalPrice={totalPrice} shipping_method={this.state.shipping_method} />
                    </div>
                    <div className="Shipping-Content-Right"  >
                        <ShoppingCart totalPrice={totalPrice} shipping_method={this.state.shipping_method} shippingMethodChange={this.shippingMethodChange}/>
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
                                <input id="fullname_visible" ref={this.fullname_visible_ref} type="text" placeholder="Enter Your Name" onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("fullname_visible")} value={this.state.fullname} />
                                <div className="Error-In-Input" style={{ display: this.state.fullname_visible }}>Please Enter Your Name</div>
                            </div>

                        </div>
                        <div className="StreetAddress" >
                            <p>Street Address</p>
                            <div className="StreetAddress-Box">
                                <input id="address_visible" ref={this.address_visible_ref} type="text" placeholder="Enter Your Address" onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("address_visible")} required value={this.state.address} />
                                <div className="Error-In-Input" style={{ display: this.state.address_visible }}>Please Enter Address</div>
                            </div>

                        </div>
                        <div className="Building" >
                            <p>Apt, Suite, Bldg (optional)</p>
                            <div className="Building-Box">
                                <input id="building_visible"  type="text" placeholder="Optional" value={this.state.building} onChange={this.onInpuFieldChange} />
                            </div>
                        </div>
                        <div className="ZipCode" >
                            <p>Zip Code</p>
                            <div className="ZipCode-Box">
                                <input id="zipcode_visible" ref={this.zipcode_visible_ref} type="number" placeholder="Enter Zipcode" required value={this.state.zipcode} onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("zipcode_visible")} />
                                <div className="Error-In-Input" style={{ display: this.state.zipcode_visible }}>Please Enter Zipcode</div>
                            </div>

                        </div>
                        <div className="PhoneNumber">
                            <p>Phone Number</p>
                            <div className="PhoneNumber-Box">
                                <input id="phone_visible" ref={this.phone_visible_ref} type="number" placeholder="Enter phone number" value={this.state.phone} onChange={this.onInpuFieldChange} onBlur={() => this.inputFieldCheck("phone_visible")} />
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
