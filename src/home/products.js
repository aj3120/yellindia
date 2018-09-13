import React, { Component } from 'react';
import Item from './item';
import Loader from '../Loader';
class Products extends Component {

  listItems = () => {
    var productList = this.props.home_products.map((product) => (
      <Item id={product.id} key={product.id} name={product.name} view={this.props.view}
        brand={product.brand} price={product.price} image={product.image} callQuickPage={this.props.callQuickPage} />
    ));

    return (productList)
  }
  render() {
    let tableStyle = this.props.view === 'row' ? { gridTemplateColumns: 'auto',gridRowGap: '5px' } : {}
    if (this.props.home_products !== null && this.props.home_products !== undefined) {

      return (
        
          <div className="List-Items" style={tableStyle}>

            {this.listItems()}

          </div>
      );
    }


    else {
      return (<Loader />)
    }
  }
}

export default Products;
