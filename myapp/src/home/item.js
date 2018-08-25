import React, { Component } from 'react';
import "./item.css"
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { productCount } from '../actions/product_count';
import cartUpdateRequest from '../services/cartUpdateRequest';
const mapStateToProps=(state)=>{
  return({cart_products: state.cart_products_reducer.cart_products });

}
const mapDispatchToProps=(dispatch)=>{
  return ({ action: bindActionCreators({ productCount,push}, dispatch) })
}
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { dispQuick: 'none' };
  }

  mouseOver = () => {
    this.setState({ dispQuick: 'block' })
  }
  mouseOut = () => {
    this.setState({ dispQuick: 'none' })
  }
  addToCart=(id)=>{
    var checkSameItem=0,pos,countOfSameProduct=0;
    this.props.cart_products.forEach((product)=>{
    if(product.id==id)
     {
      checkSameItem=1;
      countOfSameProduct=product.count
      
     }

    });
    if(checkSameItem==0){
      let cart_products_new=this.props.cart_products
      cart_products_new.push({id:id,count:"1"})
      this.props.action.productCount(cart_products_new)
      cartUpdateRequest(cart_products_new)
    }
    else{
      let cart_products_old=this.props.cart_products
      let cart_products_new=cart_products_old.map((product)=>{
          if(product.id==id){
             product.count=parseInt(countOfSameProduct,10)+1;
             return(product)
          }
          else{
            return(product);
          }
      }    );
      this.props.action.productCount(cart_products_new)
      cartUpdateRequest(cart_products_new)
      
    }
    this.props.action.push('/cart')
  }
  
  render() {
    var QuickStyle
    if (this.state.dispQuick === 'block') {
      var ItemStyle = { position:'relative',left:'-5%',top:'-5%',height:'110%',width:'110%'}
      QuickStyle = { display: this.state.dispQuick }
    }
    else {
      QuickStyle = { display: this.state.dispQuick }
    }


    return (
      <div className="Item-Container">
        <div id={this.props.id} className="Item" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={ItemStyle}>
          <div id={this.props.id} className="Quick-View" style={QuickStyle} onClick={() => this.props.callQuickPage(this.props.id)}>
            <img src="assets/quick.svg" height="50px" width="180px" alt="quickview"/>
          </div>
          <div className="Product-Image">
            <img src={this.props.image} height="263px" alt="product"/>
          </div>
          <div className="Product-Content">
            <div className="Product-Name">
              {this.props.name}
            </div>
            <div className="Product-Brand">
              {this.props.brand}
            </div>
            <div className="Product-Price-And-Button">
              <div className="Product-Price">
                ${this.props.price}
              </div>
              <div className="Add-Button" onClick={()=>this.addToCart(this.props.id)}>
                <p>ADD TO CART</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item);