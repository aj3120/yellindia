import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from '../home/products';
import './category.css';
import Aparels from '../header/menu-Aparels';
import Accessories from '../header/menu-accessories';
import Bags from '../header/menu-bags';
import { category_products_action } from '../actions/category_products_action';
import categoryProductRequest from '../services/categoryProductRequest';
import QuickViewContainer from '../home/quick-view-container'
const mapStateToProps = (state) => {
  return ({ routing: state.routing, category_products: state.category_products_reducer.category_products })
}
const mapDispatchToProps = (dispatch) => {
  return ({ action: bindActionCreators({ category_products_action }, dispatch) })
}
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { dispQuickView: 'none', id: null, heading_image: '',head_color:'',head_color:'', heading_image_name: '', heading_image_desc: '' ,head_position:''}
  }
  displayQuickViewPage = (id) => {
    this.setState({ dispQuickView: 'block', id: id })
  }
  closeQuickViewPage = () => {
    this.setState({ dispQuickView: 'none', id: null })
  }
  componentWillMount() {
    let idArray = this.props.routing.location.pathname.split('/')
    let id = idArray[2];
    switch (id) {
      case "1":
        this.setState({ head_position:'10%',head_color:'white',heading_image: '/assets/apparels.jpg', heading_image_name: 'Apparels', heading_image_desc: 'White Gold began gaining popularity in the early 1900’s as an alternative to platinum. ' })
        break;
      case "2":
        this.setState({ head_position:'60%',head_color:'#232323',heading_image: '/assets/jersey.jpg', heading_image_name: 'Jersey', heading_image_desc: 'White Gold began gaining popularity in the early 1900’s as an alternative to platinum. ' })
        break;
    }
    categoryProductRequest(id).then((home_products) => this.props.action.category_products_action(home_products.data.products))

  }
  componentWillReceiveProps(next) {

    console.log(this.props.location.pathname)
    console.log(next.location.pathname)
  
      if (this.props.location.pathname !== next.location.pathname) {
        let idArray = next.location.pathname.split('/')
        let id = idArray[2];
        switch (id) {
          case "1":
            this.setState({ head_position:'10%',head_color:'white',heading_image: 'http://10.7.20.68:3000/assets/apparels.jpg', heading_image_name: 'Apparels', heading_image_desc: 'White Gold began gaining popularity in the early 1900’s as an alternative to platinum. ' })
            break;
          case "2":
            this.setState({ head_position:'60%',head_color:'#232323',heading_image: 'http://10.7.20.68:3000/assets/jersey.jpg', heading_image_name: 'Jersey', heading_image_desc: 'White Gold began gaining popularity in the early 1900’s as an alternative to platinum. ' })
            break;

        }
        categoryProductRequest(id).then((home_products) => this.props.action.category_products_action(home_products.data.products))
      }
    




  }
  render() {

    return (
     
      <div style={{position:'relative'}}>
        <QuickViewContainer disp={this.state.dispQuickView} id={this.state.id} callClosePage={this.closeQuickViewPage} productDetailButtonShow={"flex"}/>

        <div className="Category-Header-Image">
          <img src={this.state.heading_image} alt="apparels" />
          <div className="Category-Header-Image-Title">
            <div className="Category-Heading-Image-Name" style={{left:this.state.head_position,color:this.state.head_color}}>{this.state.heading_image_name}</div>
            <div className="Category-Heading-Image-Desc" style={{left:this.state.head_position,color:this.state.head_color}}>{this.state.heading_image_desc}</div>
          </div>
          <div>
          </div>
        </div>
        <div className="Category-Header">
          <p> MEN </p>
        </div>
        <div className="Category-Wrapper">

          
          <div className="Category-Left">
            <Aparels />
            <Accessories />
            <Bags />
          </div>
          <div className="Category-Right">
            <Products callQuickPage={this.displayQuickViewPage} titleDisplay='none' home_products={this.props.category_products} />
           
          </div>

        </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
