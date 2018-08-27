import React, { Component } from 'react';
import QuickView from '../home/quick-view'
class Product extends Component {
  
  render() {
    return (
      <div className="Home">
         <QuickView disp={'block'} id={'2'} callClosePage={this.closeQuickViewPage}/>
      </div>
    );
  }
}

export default Product;
