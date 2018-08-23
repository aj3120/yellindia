import React, { Component } from 'react';
import Item from './item';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {home_products_action} from '../actions/home_products_action';
import homeProductRequest from '../services/homeProductRequest';
import Loader from '../Loader'

const mapStateToProps=(state)=>{
  return({home_products:state.home_products_reducer.home_products})
}
const mapDispatchToProps=(dispatch)=>{
  return({action:bindActionCreators({home_products_action},dispatch)})
}
class Products extends Component {
  componentDidMount(){

      homeProductRequest().then((home_products)=>this.props.action.home_products_action(home_products.data.products))

    }
  listItems=()=>{
          var productList=this.props.home_products.map((product)=>(
                                                          <Item id={product.id} key={product.id} name={product.name}
                                                         brand={product.brand} price={product.price} image={product.image} callQuickPage={this.props.callQuickPage}/>
                                                          ));
          
          return(productList)
        }
  render() {
    if(this.props.home_products!==null)
    return (
      <div className="Products">
          <div className="Product-Title">
          <div className="Title">
            Authentic World Cup Kits
          </div>  
          <div className="Search-Box">
            <img src="assets/search-input-icon.svg" height="14px" width="14px" alt="search icon"/>
            <input type="text" placeholder="Search Kits"/>
          </div>
          <div className="Sort">
            SORT
          </div>   
          <div className="Filter">
            FILTER
          </div> 
          </div>
          <div className="List-Items">

             {this.listItems()}

          </div>
      </div>
    );
    else{
      return(<Loader/>)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);
