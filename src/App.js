import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Home from './home'
import Loader from './Loader'
import Footer from './footer';
import { Switch, Route, withRouter } from 'react-router-dom';
import Cart from './cart';
import allProductsRequest from './services/updateAllProduct';
import cartProductsRequest from './services/cartProductRequest';
import { bindActionCreators } from 'redux';
import { allProductsAction } from './actions/all_products_action'
import { connect } from 'react-redux'
import { cartProductsAction } from './actions/cart_products_action';
import Shipping from './checkout/shipping';
import Payment from './checkout/payment';
import Review from './checkout/review';
import Thanks from './checkout/thanks';
import Product from './product-details';
import CategoryPage from './category';
import worker_script from './webworker/worker_script';
import {showMenuAction} from './actions/showMenuAction';
import SearchPage from './search'
const mapStateToProps = (state) => {
  return ({ all_products: state.all_products_reducer.all_products, cart_products: state.cart_products_reducer.cart_products });
}
const mapDispatchToProps = (dispatch) => {
  return (
    { action: bindActionCreators({ allProductsAction, cartProductsAction,showMenuAction}, dispatch) }
  )
}
class App extends Component {
  componentDidMount() {

    var myWorker = new Worker(worker_script);
    myWorker.onmessage = (m) => {
      const cart_products_object=JSON.parse(m.data)
      const cart_products=cart_products_object.cart_products
      this.props.action.cartProductsAction(cart_products)
    };
    setInterval(()=>myWorker.postMessage('Update Cart Details'),10000);

    allProductsRequest().then((response) => this.props.action.allProductsAction(response.data.products))
    cartProductsRequest().then((response) => this.props.action.cartProductsAction(response.data.cart_products))
  }

  render() {
    if (this.props.cart_products !== undefined && this.props.cart_products !== null) {
      return (
        <div className="App">
          <Header />
          <div className="App-Content" onClick={()=>this.props.action.showMenuAction({showMenuFlag: 'none', showMenuFlagOpposite: 'block' })}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/review" component={Review} />
            <Route path="/thanks" component={Thanks} />
            <Route path="/product" component={Product} />
            <Route path="/jumpsuits/:id" component={CategoryPage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
          </div>
          <Footer />
        </div>
      );
    }
    else {
      return (<Loader />)
    }

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
