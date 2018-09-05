import React, { Component } from 'react';
import Item from './item';
import Loader from '../Loader';
import {searchTextAction} from '../actions/search_text_action';
import {push} from 'react-router-redux'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {search_products_action} from '../actions/search_products_action';
const mapDispatchToProps=(dispatch)=>{
  return({action:bindActionCreators({searchTextAction,push,search_products_action},dispatch)})
}
class Products extends Component {  
  constructor(props){
    super(props);
    this.state={searchText:'',view:'column',search_title:'none',original_title:'block'}
  }
  listItems=()=>{
          var productList=this.props.home_products.map((product)=>(
                                                          <Item id={product.id} key={product.id} name={product.name} view={this.state.view}
                                                         brand={product.brand} price={product.price} image={product.image} callQuickPage={this.props.callQuickPage}/>
                                                          ));
          
          return(productList)
        }
  SearchValueChange=(event)=>{
    
        this.setState({searchText:event.target.value})
        this.props.action.searchTextAction(event.target.value)
        this.props.action.push('/search')
    
        
  } 
  changeToMobileSearch=()=>{
    if(window.innerWidth<768){
      this.setState({search_title:'block',original_title:'none'})
      this.props.action.push('/search')
    }
   
  
  }     
  render() {
    let tableStyle=this.state.view==='row'?{gridTemplateColumns:'auto'}:{}
    if(this.props.home_products!==null && this.props.home_products!==undefined)
    {
      
      return (
        <div className="Products" id="shome-home-jump">
            <div className="Product-Title" style={{display:this.props.titleDisplay}}>
            <div className="Title" style={{display:this.state.original_title}}>
              {this.props.title}
            </div>  
            <div className="Title" style={{display:this.state.search_title}}>
              Search Result
            </div>
            <div className="Search-Box">
              <img src="assets/search-input-icon.svg" height="14px" width="14px" alt="search icon"/>
              <input id="search" type="text" placeholder="Search Kits" onClick={this.changeToMobileSearch} onChange={this.SearchValueChange} value={this.state.searchText} />
            </div>
            <div className="Table" onClick={()=>this.setState({view:'row'})}>
              <img src="/assets/list.png" alt="table" height="15px"/>
            </div>
            <div className="Grid" onClick={()=>this.setState({view:'column'})}>
            <img src="/assets/grid.png" alt="grid" height="14px" />
            </div>
            <div className="Sort">
              SORT
            </div>   
            <div className="Filter">
              FILTER
            </div> 
            </div>
            <div className="List-Items" style={tableStyle}>
  
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
