import React, { Component } from 'react';
import "./item.css"
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { dispQuick: 'none' };
  }

  mouseOver = () => {
    this.setState({ dispQuick: 'block' })
  }
  mouseOut = () => {
    this.setState({ dispQuick: 'none' })
  }
  show
  render() {
    if (this.state.dispQuick == 'block') {
      var ItemStyle = { position:'relative',left:'-5%',top:'-5%',height:'110%',width:'110%'}
      var QuickStyle = { display: this.state.dispQuick }
    }
    else {
      var QuickStyle = { display: this.state.dispQuick }
    }


    return (
      <div className="Item-Container">
        <div id={this.props.id} className="Item" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={ItemStyle}>
          <div id={this.props.id} className="Quick-View" style={QuickStyle} onClick={() => this.props.callQuickPage(this.props.id)}>
            <img src="assets/quick.svg" height="50px" width="180px" />
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
      </div>
    );
  }
}

export default Item;