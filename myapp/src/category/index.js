import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from '../home/products';
import './category.css';
import Aparels from '../header/menu-Aparels';
import Accessories from '../header/menu-accessories';
import Bags from '../header/menu-bags';

const mapStateToProps = (state) => {
  return ({ routing: state.routing })
}
const mapDispatchToProps = (dispatch) => {
  return ({ action: bindActionCreators({}, dispatch) })
}
class Category extends Component {
  constructor(props){
    super(props);
    this.state={dispQuickView:'none',id:null}
  }
  displayQuickViewPage=(id)=>{
    this.setState({dispQuickView:'block',id:id})
  }
  closeQuickViewPage=()=>{
    this.setState({dispQuickView:'none',id:null})
  }
  render() {
    let idArray = this.props.routing.location.pathname.split('/')
    let id = idArray[2];
    return (
      <div>
      <div className="Category-Header-Image">
      <img src="/assets/apparels.jpg" alt="apparels"/>
      </div>
      <div className="Category">
        
       
        <div className="Category-Left">
          <Aparels/>
          <Accessories/>
          <Bags/>
        </div>
        <div className="Category-Right">
          <Products callQuickPage={this.displayQuickViewPage} titleDisplay='none'/>
        </div>
        
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
