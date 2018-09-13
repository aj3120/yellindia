import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckoutItem from './item';
const mapStateToProps = (state) => {
    return ({
        cart_products: state.cart_products_reducer.cart_products, total_price: state.cart_products_reducer.total_price, all_products: state.all_products_reducer.all_products,

    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({}, dispatch) })
}

class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state={shipping_style: { border: "2px solid #2196f3", color: '#2196f3' }, shipping_style_opposite: {
            border: "2px solid gray",
            color: 'gray'
        }, voucher: 'none', voucher_opposite: 'inline-block'}
    }
    openVocuherBox = () => {
        this.state.voucher === 'none' ? this.setState({ voucher: 'inline-block', voucher_opposite: 'none' }) : this.setState({ voucher: 'none', voucher_opposite: 'inline-block' })
    }

        render(){
            
            var checkout = this.props.cart_products.map((product, index) => <CheckoutItem id={product.id} key={index} count={product.count} />)
            return(
                <div className="Shopping-Cart-DropList" style={{ display: this.props.showShoppingCart }}>
                    <div className="Shopping-Cart-Continer">
                            <div className="Shipping-Items-List">
                                {checkout}
                            </div>
                            <div className="Divider-Line2">
                            </div>
                            <div className="Voucher" style={{display:this.props.showPriceCalculations}} >
                                <div className="Voucher-Heading" onClick={this.openVocuherBox}><p> Have Voucher?</p><i className="up" style={{ display: this.state.voucher }} /><i className="down" style={{ display: this.state.voucher_opposite }} /></div>
                                <div><input type="text" placeholder="Voucher Number" style={{ display: this.state.voucher }} /></div>
                            </div>


                            <div className="Divider-Line2" style={{display:this.props.showPriceCalculations}}>
                            </div>
                            <div className="Shipping-Price-Calculations" style={{display:this.props.showPriceCalculations}}>
                                <div className="Shipping-Subtotal">
                                    <div className="Shipping-Subtotal-Heading">
                                        <p>Subtotal</p>
                                    </div>
                                    <div className="Shipping-Subtotal-Value">
                                        ${this.props.totalPrice}
                                    </div>
                                </div>
                                <div className="Shipping-Type">
                                    <div className="Shipping-Type-Heading">
                                        <p>Shipping</p>
                                    </div>
                                    <div className="Shipping-Type-Value">
                                        <p>{this.props.shipping_method}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="Divider-Line2" style={{display:this.props.showPriceCalculations}}>
                            </div>
                            <div className="Shipping-Calculated-Price" style={{display:this.props.showPriceCalculations}}>

                                <div className="Shipping-Total">
                                    <div className="Shipping-Total-Heading">
                                        <p>Total</p>
                                    </div>
                                    <div className="Shipping-Total-Value">
                                        ${this.props.totalPrice}
                                    </div>
                                </div>
                            </div>
                           
                        </div>
            </div>
            );
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart)