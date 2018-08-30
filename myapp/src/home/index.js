import React, { Component } from 'react';
import './home.css';
import TitleImage from './title-image';
import Products from './products';
import About from './about';
import Shop from './shop';
import QuickViewContainer from './quick-view-container'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {home_products_action} from '../actions/home_products_action';
import homeProductRequest from '../services/homeProductRequest';
const mapStateToProps=(state)=>{
  return({home_products:state.home_products_reducer.home_products})
}
const mapDispatchToProps=(dispatch)=>{
  return({action:bindActionCreators({home_products_action},dispatch)})
}

class Home extends Component {
  constructor(props){
    super(props);
    this.state={dispQuickView:'none',id:null}
  }
  componentDidMount(){

    homeProductRequest().then((home_products)=>this.props.action.home_products_action(home_products.data.products))

  }
  displayQuickViewPage=(id)=>{
    this.setState({dispQuickView:'block',id:id})
  }
  closeQuickViewPage=()=>{
    this.setState({dispQuickView:'none',id:null})
  }
  render() {
    return (
      <div className="Home">
          <TitleImage/>
          <Products id="product-01"callQuickPage={this.displayQuickViewPage} titleDisplay='block' home_products={this.props.home_products}/>
          <QuickViewContainer disp={this.state.dispQuickView} id={this.state.id} callClosePage={this.closeQuickViewPage} productDetailButtonShow={"flex"}/>
          <About/>
          <Shop/>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
