import React, { Component } from 'react';
import Item from './item';
import Loader from '../Loader';
import {searchTextAction} from '../actions/search_text_action';
import {push} from 'react-router-redux'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
const mapDispatchToProps=(dispatch)=>{
  return({action:bindActionCreators({searchTextAction,push},dispatch)})
}
class Products extends Component {  
  constructor(props){
    super(props);
    this.state={searchText:''}
  }
  listItems=()=>{
          var productList=this.props.home_products.map((product)=>(
                                                          <Item id={product.id} key={product.id} name={product.name}
                                                         brand={product.brand} price={product.price} image={product.image} callQuickPage={this.props.callQuickPage}/>
                                                          ));
          
          return(productList)
        }
  SearchValueChange=(event)=>{
    this.setState({searchText:event.target.value})
        this.props.action.searchTextAction(event.target.value)
        this.props.action.push('/search')
  }      
  render() {
    
    if(this.props.home_products!==null && this.props.home_products!==undefined)
    {
      
      return (
        <div className="Products" id="shome-home-jump">
            <div className="Product-Title" style={{display:this.props.titleDisplay}}>
            <div className="Title" >
              {this.props.title}
            </div>  
            <div className="Search-Box">
              <img src="assets/search-input-icon.svg" height="14px" width="14px" alt="search icon"/>
              <input id="search" type="text" placeholder="Search Kits" onChange={this.SearchValueChange} value={this.state.searchText}/>
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
    }

    
    else{
      return(<Loader/>)
    }
  }
}

export default connect(null,mapDispatchToProps)(Products);
