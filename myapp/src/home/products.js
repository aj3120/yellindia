import React, { Component } from 'react';
import Item from './item';
import Loader from '../Loader'
class Products extends Component {  
  listItems=()=>{
          var productList=this.props.home_products.map((product)=>(
                                                          <Item id={product.id} key={product.id} name={product.name}
                                                         brand={product.brand} price={product.price} image={product.image} callQuickPage={this.props.callQuickPage}/>
                                                          ));
          
          return(productList)
        }
  render() {
    if(this.props.home_products!==null && this.props.home_products!==undefined)
    return (
      <div className="Products" id="shome-home-jump">
          <div className="Product-Title" style={{display:this.props.titleDisplay}}>
          <div className="Title" >
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

export default Products;
