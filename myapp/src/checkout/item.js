import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productCount } from '../actions/product_count';
import cartUpdateRequest from '../services/cartUpdateRequest';
const mapStateToProps = (state) => {
    return ({ all_products: state.all_products_reducer.all_products, cart_products: state.cart_products_reducer.cart_products })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ productCount }, dispatch) })
}
class CheckoutItem extends Component {
    decrement = () => {
        let cart_products_new = this.props.cart_products.map((product) => {
            if (product.id === this.props.id && parseInt(product.count,10) > 1) {
                return ({ id: product.id, count: `${parseInt(product.count,10) - 1}` })
            }
            else {
                return (product)
            }
        })
        this.props.action.productCount(cart_products_new)
        cartUpdateRequest({ cart_products_new })
    }
    increment = () => {
        let cart_products_new = this.props.cart_products.map((product) => {
            if (product.id === this.props.id) {
                return ({ id: product.id, count: `${parseInt(product.count,10) + 1}` })
            }
            else {
                return (product)
            }
        })
        this.props.action.productCount(cart_products_new)
        cartUpdateRequest(cart_products_new)
    }
    remove = () => {
        var cart_products_new=[]
        let cart_products_old=this.props.cart_products;
        cart_products_old.forEach((product,index) => {
            if (product.id === this.props.id) {

                cart_products_new=cart_products_old.slice(0,index).concat(cart_products_old.slice(index+1))

                
            }
            
        })
        this.props.action.productCount(cart_products_new)
        cartUpdateRequest(cart_products_new)
        
    }
    render() {
        return (
            <div>
                <div className="Cart-Item-Checkout">
                    <div className="Checkout-Image">
                        <img src={this.props.all_products.id[this.props.id].image} alt="product" />
                    </div>
                    <div className="Checkout-Details">
                        <div className="Checkout-Name">
                            {this.props.all_products.id[this.props.id].name}
                        </div>
                        <div className="Checkout-Brand">
                            {this.props.all_products.id[this.props.id].brand}
                        </div>
                        <div className="Checkout-Quandity">
                            <div>Qty</div>
                            <div className="Decrement" onClick={this.decrement}>
                                <img src="assets/decrement.svg" alt="decrement" />
                            </div >
                            <div>{this.props.count}</div>
              
                            <div className="Increment" onClick={this.increment}>
                                <img src="assets/increment.svg" alt="increment" />
                            </div>
                        </div>
                    </div>
                    <div className="Checkout-Options">
                        <div className="Checkout-Remove" onClick={this.remove}>
                            <img src="assets/remove.svg" alt="remove" />
                        </div>
                        <div className="Checkout-Price">
                            ${this.props.all_products.id[this.props.id].price}
                        </div>

                    </div>
                </div>
                <div className="Checkout-Mobile-Extras">
                      <div className="Checkout-Quandity">
                            <div>Qty</div>
                            <div className="Decrement" onClick={this.decrement}>
                                <img src="assets/decrement.svg" alt="decrement" />
                            </div >
                            <div>{this.props.count}</div>
              
                            <div className="Increment" onClick={this.increment}>
                                <img src="assets/increment.svg" alt="increment" />
                            </div>
                        </div>
                        <div className="Checkout-Price">
                            ${this.props.all_products.id[this.props.id].price}
                        </div>

                </div>
                <div className="Divider-Line">
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
