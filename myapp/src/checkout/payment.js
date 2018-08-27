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
import {totalPriceAction} from '../actions/total-price-action'
const mapStateToProps = (state) => {
    return ({ cart_products: state.cart_products_reducer.cart_products,total_price:state.cart_products_reducer.total_price,all_products: state.all_products_reducer.all_products})
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ replace, go,totalPriceAction }, dispatch) })
}

class Payment extends Component {
    constructor(props){
        super(props);
        if(window.innerWidth<768){
            this.state={showShoppingCart:'none'}
        }
        else{
            this.state={showShoppingCart:'block'}
        }
        
    }
    goBack = () => {
        this.props.action.go(-2);
    }
    goCheckout = (totalPrice) => {
        this.props.action.replace("/review")
        this.props.action.totalPriceAction(totalPrice);
    }
    changeShoppingCartVisibility=()=>{
        this.state.showShoppingCart==='none'?
        this.setState({showShoppingCart:'block'}):
        this.setState({showShoppingCart:'none'})
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
                    <div className="Payment-Content-Right" style={{display:this.state.showShoppingCart}} >
                        <div className="Shipping-Items">
                            <div className="Shopping-Cart">Shopping Cart</div> <div className="Checkout-Count"><div>{this.props.cart_products.length}</div></div>
                        </div>
                        <div className="Divider-Line2">
                        </div>
                        {checkout}
                    </div>
                    <div className="Payment-Content-Left">
                    </div>
                    
                </div>

                <div className="Forward-Buttons">
                    <div className="Continue" onClick={this.goBack}>
                        <div>CONTINUE SHOPPING</div>
                    </div>
                    <div className="Checkout" onClick={()=>this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO REVIEW</div>
                    </div>
                </div>
                <div className="Forward-Buttons-Mobile">
                    <div className="Continue-Mobile" onClick={this.goBack}>
                        <div>BACK</div>
                    </div>
                    <div className="Checkout-Mobile" onClick={()=>this.goCheckout(totalPrice)}>
                        <div>CONTINUE TO REVIEW</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
