import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "react-image-gallery/styles/css/image-gallery.css";
import { productCount } from '../actions/product_count';
import { push } from 'react-router-redux';
import './quickview.css';
import QuickView from './quick-view';
const mapStateToProps = (state) => {
  return ({ all_products: state.all_products_reducer.all_products, cart_products: state.cart_products_reducer.cart_products })
}
const mapDispatchToProps = (dispatch) => {
  return ({ action: bindActionCreators({ productCount, push }, dispatch) })
}
class QuickViewContainer extends Component {


  render() {
    if (this.props.id !== null) {
      return (
        <div className="QuickViewPage-Container" style={{ display: this.props.disp }}>
          <div className="QuickViewPage">
            <div className="QuickViewPage-Heading">
              <div className="QuickViewPage-Heading-Content">{this.props.all_products.id[this.props.id].name}</div>
              <div>
                <img src="assets/close.png" onClick={() => this.props.callClosePage()} alt="close" />
              </div>
            </div>
            <QuickView disp={this.props.disp} id={this.props.id} callClosePage={this.props.allClosePage}/>

          </div>

        </div>
      );
    }
    else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickViewContainer);