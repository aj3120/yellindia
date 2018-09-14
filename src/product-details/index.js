import React, { Component } from 'react';
import QuickView from '../home/quick-view';
import {connect} from 'react-redux';
import allProductsRequest from '../services/updateAllProduct';
import cartProductsRequest from '../services/cartProductRequest';
import {allProductsAction} from '../actions/all_products_action'
import {cartProductsAction} from '../actions/cart_products_action';
import { bindActionCreators } from 'redux';
import './product.css';
import Review from './review';
import LikeProduct from './like-product'
const mapStateToProps = (state) => {
    return ({ routing: state.routing })
  }
  const mapDispatchToProps = (dispatch) => {
    return ({action:bindActionCreators({allProductsAction,cartProductsAction},dispatch)})
  }
class Product extends Component {
  componentWillMount(){
    allProductsRequest().then((response)=>this.props.action.allProductsAction(response.data.products))
    cartProductsRequest().then((response)=>this.props.action.cartProductsAction(response.data.cart_products))
    window.scrollTo(0,0)
  } 
  render() {
    const idArray=this.props.routing.location.pathname.split('/')
    const id=idArray[2];
    return (
      <div className="Product-Container">
         <QuickView disp={'block'} id={id} callClosePage={this.props.allClosePage} productDetailButtonShow={'none'}/>
         <Review id={id}/>
         <LikeProduct/>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Product);
