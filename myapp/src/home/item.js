import React, { Component } from 'react';
import "./item.css"
class Item extends Component {
  constructor(props){
    super(props);
    this.state={dispQuick:'none'};
  }

  mouseOver=()=>{
    this.setState({dispQuick:'block'})
  }
  mouseOut=()=>{
    this.setState({dispQuick:'none'})
  }
  render() {
    if(this.state.dispQuick=='block')
    {
      var ItemStyle={padding:'10px'}
      var QuickStyle={display:this.state.dispQuick}
    }
    else{
      var QuickStyle={display:this.state.dispQuick}
    }
      
    
    return (
      <div  className="Item" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={ItemStyle}>
        <div className="Quick-View" style={QuickStyle}>
          asdasdasdas
        </div>
        <div className="Product-Image">
          <img src={this.props.image} height="263px" />       
        </div>
        <div className="Product-Content">
        <div className="Product-Name">
          {this.props.name}
        </div>
        <div className="Product-Brand">
         {this.props.brand}
        </div>
        <div className="Product-Price-And-Button">
          <div className="Product-Price">
            {this.props.price}
          </div>
          <div className="Add-Button">
            <p>ADD TO CART</p>

          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Item;