import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './cart.css';
import CartItem from './cart-item'
const mapStateToProps = (state) => {
    return ({all_products: state.all_products_reducer.all_products,cart_products:state.cart_products_reducer.cart_products})
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({}, dispatch) })
}

class Cart extends Component {
componentDidMount(){
    
}
render() {
        var productPrice,totalPrice=0;
        let totalPriceArray=this.props.cart_products.map((product)=>{
                productPrice=parseInt(product.count,10)*parseInt(this.props.all_products.id[product.id].price,10)
                return(productPrice)
        })
        totalPriceArray.forEach((num)=>{
            totalPrice=totalPrice+num;
        })
        const empty =[<div className="Empty">Your Cart is Empty</div>]
        var CartItems=this.props.cart_products.map((product,index)=><CartItem id={product.id} key={index} count={product.count}/>)
        return (
            <div className="Cart">
                <div className="Cart-Title">
                    Your Cart
                 </div>
                <div>
                    {this.props.cart_products.length!==0?
                    
                    CartItems
                    :
                    empty
                    }
                </div>
                <div className="Price-Calculation">
                    <div className="Price-Listing">
                        <div className="Price-Content">
                            <div>Subtotal</div>
                            <div>Shipping</div>
                            <div>Taxes</div>
                            <div className="Total-Content">
                            Total
                            </div>
                        </div>
                        <div className="Price-Value">
                            <div>${totalPrice}</div>
                            <div>-</div>
                            <div>-</div>
                            <div className="Total-Price">
                            ${totalPrice}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
