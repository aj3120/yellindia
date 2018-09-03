import React, { Component } from 'react';
import TitleImage from '../home/title-image';
import Products from '../home/products';
import QuickViewContainer from '../home/quick-view-container'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {search_products_action} from '../actions/search_products_action';
import searchProductRequest from '../services/searchProductRequest';
const mapStateToProps=(state)=>{
  return({search_products:state.search_products_reducer.search_products,searchText:state.app_helper_reducer.searchText,routing:state.routing})
}
const mapDispatchToProps=(dispatch)=>{
  return({action:bindActionCreators({search_products_action},dispatch)})
}

class Search extends Component {
    constructor(props){
        super(props);
        this.state={dispQuickView:'none',id:null}
      }
      componentWillMount(){
    
        searchProductRequest({searchText:this.props.searchText}).then((search_products)=>this.props.action.search_products_action(search_products.data))
    
      }
      componentWillReceiveProps(next){
        if(next.routing.pathname==='/search' && next.routing.key!==this.props.key){
            searchProductRequest({searchText:this.props.searchText}).then((search_products)=>this.props.action.search_products_action(search_products.data))
        }
      }
      displayQuickViewPage=(id)=>{
        this.setState({dispQuickView:'block',id:id})
      }
      closeQuickViewPage=()=>{
        this.setState({dispQuickView:'none',id:null})
      }

  render() {
    if(this.props.search_products!==null){
        return (
            <div className="Search-Result">
                <TitleImage/>
                <h3>Search Result</h3>
                <Products id="product-01"callQuickPage={this.displayQuickViewPage} titleDisplay='none' home_products={this.props.search_products}/>
                <QuickViewContainer disp={this.state.dispQuickView} id={this.state.id} callClosePage={this.closeQuickViewPage} productDetailButtonShow={"flex"}/>
            </div>
          );
    }  
    else{
        return null
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);
