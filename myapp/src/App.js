import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Home from './home'
import Loader from './Loader'
import Footer from './footer';
import {Switch,Route,withRouter} from 'react-router-dom';
import Cart from './cart';
import allProductsRequest from './services/updateAllProduct';
import cartProductsRequest from './services/cartProductRequest';
import { bindActionCreators } from 'redux';
import {allProductsAction} from './actions/all_products_action'
import {connect} from 'react-redux'
import {cartProductsAction} from './actions/cart_products_action';
import Shipping from './checkout/shipping';
import Payment from './checkout/payment';
import Review from './checkout/review';
import Thanks from './checkout/thanks';
import Product from './product-details';

const mapStateToProps=(state)=>{
      return({all_products:state.all_products_reducer.all_products,cart_products:state.cart_products_reducer.cart_products});
}
const mapDispatchToProps=(dispatch)=>{
  return(
      {action:bindActionCreators({allProductsAction,cartProductsAction},dispatch)}
  )
}
class App extends Component {
  componentDidMount(){
    allProductsRequest().then((response)=>this.props.action.allProductsAction(response.data.products))
    cartProductsRequest().then((response)=>this.props.action.cartProductsAction(response.data.cart_products))

  }
 
  render() {
    if(this.props.cart_products!==undefined && this.props.cart_products!==null){
      return (
        <div className="App">
            <Header/>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/shipping" component={Shipping}/>
            <Route path="/payment" component={Payment}/>   
            <Route path="/review" component={Review}/>
            <Route path="/thanks" component={Thanks}/>
            <Route path="/product" component={Product}/>
            </Switch>
            <Footer/>
        </div>
      );
    } 
    else{
      return(<Loader/>)
    }
    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
