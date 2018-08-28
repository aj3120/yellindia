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
import {addressAction }from '../actions/address-action'
import {totalPriceAction} from '../actions/total-price-action'
const mapStateToProps = (state) => {
    return ({ cart_products : state.cart_products_reducer.cart_products,total_price:state.cart_products_reducer.total_price ,all_products: state.all_products_reducer.all_products})
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ go, replace,addressAction ,totalPriceAction}, dispatch) })
}

class Shipping extends Component {
    constructor(props){
        super(props);
        if(window.innerWidth<768){
            this.state={showShoppingCart:'none',fullname:'',address:'',building:'',zipcode:'',phone:''}
        }
        else{
            this.state={showShoppingCart:'block',fullname:'',address:'',building:'',zipcode:'',phone:''}
        }
        
    }
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {
        if(this.state.fullname===''||this.state.address===''||this.state.building===''||this.state.zipcode===''||this.state.phone===''){
         alert("Please Enter Details")
        }
        else{
         this.props.action.addressAction({fullname:this.state.fullname,address:this.state.address,
                                          building:this.state.building,zipcode:this.state.zipcode,
                                          phone:this.state.phone  });
        this.props.action.totalPriceAction(totalPrice);                                    
        this.props.action.replace("/payment")
        }
        

    }
    changeShoppingCartVisibility=()=>{
        this.state.showShoppingCart==='none'?
        this.setState({showShoppingCart:'block'}):
        this.setState({showShoppingCart:'none'})
    }
    onFirstnameChange=(event)=>{
        this.setState({fullname:event.target.value})
    }
    onAddressChange=(event)=>{
        this.setState({address:event.target.value})
    }
    onBuildingChange=(event)=>{
        this.setState({building:event.target.value})
    }
    onZipcodeChange=(event)=>{
        this.setState({zipcode:event.target.value})
    }
    onPhoneChange=(event)=>{
        this.setState({phone:event.target.value})
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
                    <p>Checkout</p>
                </div>


                <div className="Shipping-Content">
                    <div className="Checkout-Status-Container">
                        <Status />
                    </div>
                    <div className="Shopping-Cart-Dropdown" onClick={this.changeShoppingCartVisibility}>
                            <div><p>Shopping Cart</p></div><div>${totalPrice}</div>
                        </div>
                    <div className="Shipping-Content-Right" style={{display:this.state.showShoppingCart}} >
                        <div className="Shipping-Items">
                            <div className="Shopping-Cart">Shopping Cart</div> <div className="Checkout-Count"><div>{this.props.cart_products.length}</div></div>
                        </div>
                        <div className="Divider-Line2">
                        </div>
                        {checkout}
                    </div>
                    <div className="Shipping-Content-Left">

                        
                        <div className="Shipping-Login">
                            <p>Login-With</p>
                            <div className="Social-Container">
                                <SocialLogin />
                            </div>
                        </div>
                        <div className="FullName">
                            <p>Full Name</p>
                            <div className="FullName-Box">
                                <input type="text" placeholder="Enter Your Name" required value={this.state.fullname} onChange={this.onFirstnameChange}/>
                            </div>
                        </div>
                        <div className="StreetAddress">
                            <p>Street Address</p>
                            <div className="StreetAddress-Box">
                                <input type="text" placeholder="Enter Your Address" required value={this.state.address} onChange={this.onAddressChange}/>
                            </div>
                        </div>
                        <div className="Building">
                            <p>Apt, Suite, Bldg (optional)</p>
                            <div className="Building-Box">
                                <input type="text" placeholder="Optional" value={this.state.building} onChange={this.onBuildingChange}/>
                            </div>
                        </div>
                        <div className="ZipCode">
                            <p>Zip Code</p>
                            <div className="ZipCode-Box">
                                <input type="text" placeholder="Zip Code" required value={this.state.zipcode} onChange={this.onZipcodeChange}/>
                            </div>
                        </div>
                        <div className="PhoneNumber">
                            <p>Phone Number</p>
                            <div className="PhoneNumber-Box">
                                <input type="text" placeholder="Phone number" value={this.state.phone} onChange={this.onPhoneChange}/>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="Forward-Buttons">
                    <div className="Continue" onClick={this.goBack}>
                        <div>CONTINUE SHOPPING</div>
                    </div>
                    <div className="Checkout" onClick={()=>this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO PAYMENT</div>
                    </div>
                </div>
                <div className="Forward-Buttons-Mobile">
                    <div className="Continue-Mobile" onClick={this.goBack}>
                        <div>BACK</div>
                    </div>
                    <div className="Checkout-Mobile" onClick={()=>this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO PAYMENT</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
