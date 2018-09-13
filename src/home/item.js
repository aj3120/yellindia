import React, { Component } from 'react';
import "./item.css"
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { productCount } from '../actions/product_count';
import cartUpdateRequest from '../services/cartUpdateRequest';
const mapStateToProps=(state)=>{
  return({cart_products: state.cart_products_reducer.cart_products ,addNotification:state.app_helper_reducer.notificationFunction});

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
  onItemClick=(event)=>{
    if(event.target.id==="Add"){

      //ADD TO CART
      var checkSameItem=0,countOfSameProduct=0;
      this.props.cart_products.forEach((product)=>{
      if(product.id===this.props.id)
       {
        checkSameItem=1;
        countOfSameProduct=product.count
        
       }
  
      });
      if(checkSameItem===0){
        let cart_products_new=this.props.cart_products
        cart_products_new.push({id:this.props.id,count:"1"})
        this.props.action.productCount(cart_products_new)
        cartUpdateRequest(cart_products_new)
      }
      else{
        let cart_products_old=this.props.cart_products
        let cart_products_new=cart_products_old.map((product)=>{
            if(product.id===this.props.id){
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
      this.props.addNotification()
    }
    else if(event.target.id==="Quick"){
      this.props.callQuickPage(this.props.id)
    } 
    else if(event.target.id==="Item-Image" ||"Item-Image-Container" || "Item-Brand" || "Item-Name"||"Item-Content"||"Item-Price"){
      this.props.action.push(`/product/${this.props.id}`)
    }
   
  }

  render() {
    if (this.state.dispQuick === 'block' && window.innerWidth>768) {
      var ItemStyle = {  transform: 'translate(-2%, -2%)',height:'104%',width:'104%',boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.1)',transition:'all 0.3s'}
      
    }
    var view_style=this.props.view==='row'?{flexDirection:'row',alignItems:'space-betweem',webkitBoxShadow:'none',boxShadow:'none'}:{flexDirection:'column'}
    var view_style_height=this.props.view==='row'?{height:'100%'}:{}
    var divider_line=this.props.view==='row'?{display:'block'}:{display:'none'}
    return (
      <div>
      <div className="Item-Container" style={view_style_height}>
        <div id={this.props.id} className="Item" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={{...ItemStyle,...view_style}} >
          <div id={this.props.id} className="Quick-View" onClick={this.onItemClick}>
             <div id="Quick"> QUICK VIEW </div>
          </div>
          <div className="Product-Image" id="Item-Image-Container" onClick={this.onItemClick} >
            <img src={this.props.image} id="Item-Image" alt="product"/>
          </div>
          <div className="Product-Content" id="Item-Content" >
            <div className="Product-Name" id="Item-Name" onClick={this.onItemClick}>
              {this.props.name}
            </div>
            <div className="Product-Brand" id="Item-Brand" onClick={this.onItemClick}>
              {this.props.brand}
            </div>
            <div className="Product-Price-And-Button">
              <div className="Product-Price" id="Item-Price" onClick={this.onItemClick}>
                ${this.props.price}
              </div>
              <div className="Add-Button"  onClick={this.onItemClick}>
                <p id="Add">ADD TO CART</p>

              </div>
            </div>
          </div>
         
        </div>
       
      </div>
      <hr style={divider_line}/>
      </div>
       
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item);