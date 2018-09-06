import React, { Component } from 'react';
import './home.css';
import TitleImage from './title-image';
import Products from './products';
import About from './about';
import Shop from './shop';
import QuickViewContainer from './quick-view-container'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { home_products_action } from '../actions/home_products_action';
import homeProductRequest from '../services/homeProductRequest';
import { search_products_action } from '../actions/search_products_action';
import searchProductRequest from '../services/searchProductRequest';
import { searchTextAction } from '../actions/search_text_action';
const mapStateToProps = (state) => {
  return ({ home_products: state.home_products_reducer.home_products,search_products:state.search_products_reducer.search_products })
}
const mapDispatchToProps = (dispatch) => {
  return ({ action: bindActionCreators({ home_products_action ,search_products_action,searchTextAction}, dispatch) })
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { search_mode:'off',dispQuickView: 'none', id: null, search_title: 'none', original_title: 'block' ,view: 'column' }
  }
  componentDidMount() {

    homeProductRequest().then((home_products) => this.props.action.home_products_action(home_products.data.products))

  }
  displayQuickViewPage = (id) => {
    this.setState({ dispQuickView: 'block', id: id })
  }
  closeQuickViewPage = () => {
    this.setState({ dispQuickView: 'none', id: null })
  }
  SearchValueChange = (event) => {
    if (window.innerWidth > 768) {
      this.setState({ searchText: event.target.value })
      this.props.action.searchTextAction(event.target.value)
      this.props.action.push('/search')
    }
    else {
      this.setState({ searchText: event.target.value })
      this.props.action.searchTextAction(event.target.value)
      this.setState({ search_title: 'block', original_title: 'none',search_mode:'on'})
      searchProductRequest({ searchText: this.state.searchText }).then((search_products) => this.props.action.search_products_action(search_products.data))
    }

  }
  render() {
    
    let products=this.state.search_mode==='on'?this.props.search_products:this.props.home_products
    return (
      <div className="Home">
        <TitleImage />
        <div className="Products" id="shome-home-jump">
          <div className="Product-Title" style={{ display: this.props.titleDisplay }} >
            <div className="Title" style={{ display: this.state.original_title }} >
              Authentic Worldcup Kits
             </div>
            <div className="Title" style={{ display: this.state.search_title }}>
              Search Result
             </div>
            <div className="Search-Box" >
              <img src="assets/search-input-icon.svg" height="14px" width="14px" alt="search icon" />
              <input id="search" type="text" ref={this.myRef} placeholder="Search Kits" onChange={this.SearchValueChange} value={this.state.searchText} />
            </div>
            <div className="Table" onClick={() => this.setState({ view: 'row' })}>
              <img src="/assets/list.png" alt="table" height="15px" />
            </div>
            <div className="Grid" onClick={() => this.setState({ view: 'column' })}>
              <img src="/assets/grid.png" alt="grid" height="14px" />
            </div>
            <div className="Sort">
              SORT
            </div>
            <div className="Filter">
              FILTER
            </div>
          </div>

          <Products id="product-01" callQuickPage={this.displayQuickViewPage} view ={this.state.view} titleDisplay='block' title="Authentic World Cup Kits" home_products={products} />
        </div>
        <QuickViewContainer disp={this.state.dispQuickView} id={this.state.id} callClosePage={this.closeQuickViewPage} productDetailButtonShow={"flex"} />
        <About />
        <Shop />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
