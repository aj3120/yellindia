import React, { Component } from 'react';
import { connect } from 'react-redux';
import {push} from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { productCount } from '../actions/product_count';
import cartUpdateRequest from '../services/cartUpdateRequest';
import './cart-item.css';
const mapStateToProps = (state) => {
    return ({ all_products: state.all_products_reducer.all_products, cart_products: state.cart_products_reducer.cart_products })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ productCount ,push}, dispatch) })
}
class CartItem extends Component {
    componentWillMount(){
        window.scrollTo(0, 0)
    }

    decrement = () => {
        const cart_products_new = this.props.cart_products.map((product) => {
            if (product.id === this.props.id && parseInt(product.count,10) > 1) {
                return ({ id: product.id, count: `${parseInt(product.count,10) - 1}` })
            }
            else {
                return (product)
            }
        })
        this.props.action.productCount(cart_products_new)
        cartUpdateRequest(cart_products_new)
    }
    increment = () => {
        const cart_products_new = this.props.cart_products.map((product) => {
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
        const cart_products_old=this.props.cart_products;
        cart_products_old.forEach((product,index) => {
            if (product.id === this.props.id) {

                cart_products_new=cart_products_old.slice(0,index).concat(cart_products_old.slice(index+1))

                
            }
            
        })
        this.props.action.productCount(cart_products_new)
        cartUpdateRequest(cart_products_new)
        
    }
    goToProduct=()=>{
        this.props.action.push(`/product/${this.props.id}`)
    }
    render() {
        let count=0;
        this.props.cart_products.forEach((product)=>
            {
                if(product.id===this.props.id){
                    count=product.count
                }
            }
        );
        return (
            <div>
                <div className="Cart-Item" >
                    <div className="Cart-Image" onClick={this.goToProduct}>
                        <img src={this.props.all_products.id[this.props.id].image} alt="product" />
                    </div>
                    <div className="Cart-Details">
                        <div className="Cart-Name " onClick={this.goToProduct}>
                            {this.props.all_products.id[this.props.id].name}
                        </div>
                        <div className="Cart-Brand" onClick={this.goToProduct}>
                            {this.props.all_products.id[this.props.id].brand}
                        </div>
                        <div className="Cart-Quandity">
                            <div>Qty</div>
                            <div className="Decrement" onClick={this.decrement}>
                                <img src="/assets/decrement.svg" alt="decrement" />
                            </div >
                            <div>{this.props.count}</div>
              
                            <div className="Increment" onClick={this.increment}>
                                <img src="/assets/increment.svg" alt="increment" />
                            </div>
                        </div>
                    </div>
                    <div className="Cart-Options">
                        <div className="Cart-Remove" onClick={this.remove}>
                            <img src="/assets/remove.svg" alt="remove" />
                        </div>
                        <div className="Cart-Price">
                            ${this.props.all_products.id[this.props.id].price*count}
                        </div>

                    </div>
                </div>
                <div className="Cart-Mobile-Extras">
                      <div className="Cart-Quandity">
                            <div>Qty</div>
                            <div className="Decrement" onClick={this.decrement}>
                                <img src="/assets/decrement.svg" alt="decrement" />
                            </div >
                            <div>{this.props.count}</div>
              
                            <div className="Increment" onClick={this.increment}>
                                <img src="assets/increment.svg" alt="increment" />
                            </div>
                        </div>
                        <div className="Cart-Price">
                            ${this.props.all_products.id[this.props.id].price*count}
                        </div>

                </div>
                <div className="Cart-Divider-Line">
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
