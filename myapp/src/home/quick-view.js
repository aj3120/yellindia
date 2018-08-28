import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import StarRatings from 'react-star-ratings';
import { productCount } from '../actions/product_count';
import cartUpdateRequest from '../services/cartUpdateRequest';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => {
  return ({ all_products: state.all_products_reducer.all_products, cart_products: state.cart_products_reducer.cart_products })
}
const mapDispatchToProps = (dispatch) => {
  return ({ action: bindActionCreators({ productCount, push }, dispatch) })
}
class QuickView extends Component {

  constructor(props) {
    super(props);
    this.state = { addedToCart: 'none', addToCart: 'flex', count: 1 }


  }

  decrement = () => {
    let count = this.state.count;
    if (count > 1) {
      this.setState({ addedToCart: 'none', addToCart: 'flex', count: count - 1 })
    }
  }
  increment = () => {
    let count = this.state.count;

    this.setState({ addedToCart: 'none', addToCart: 'flex', count: count + 1 })


  }
  addToCart = () => {

    this.setState({ addedToCart: 'flex', addToCart: 'none' })
    let product_in_cart = false
    let pos_of_product_incart;
    this.props.cart_products.forEach((product, index) => {
      if (product.id === this.props.id) {
        product_in_cart = true
        pos_of_product_incart = index;
      }
    })

    if (product_in_cart) {
      let cart_products_new = this.props.cart_products;
      cart_products_new[pos_of_product_incart].count = parseInt(cart_products_new[pos_of_product_incart].count, 10) + this.state.count
      this.props.action.productCount(cart_products_new);
      cartUpdateRequest(cart_products_new);
      this.props.action.push('/cart')
    }
    else {
      let cart_products_new = this.props.cart_products;
      cart_products_new.push({ id: this.props.id, count: this.state.count });
      this.props.action.productCount(cart_products_new);
      cartUpdateRequest(cart_products_new);
      this.props.action.push('/cart')
    }



  }
  changeToProductDetail=()=>{
    this.props.action.push(`/product/${this.props.id}`)
  }
  render() {
    if(this.props.all_products!==null){
      const images = [
        {
          original: this.props.all_products.id[this.props.id].image,
          thumbnail: this.props.all_products.id[this.props.id].image,
        },
        {
          original: this.props.all_products.id[this.props.id].image,
          thumbnail: this.props.all_products.id[this.props.id].image,
        },
        {
          original: this.props.all_products.id[this.props.id].image,
          thumbnail: this.props.all_products.id[this.props.id].image,
        }

      ]

      let showThumb=window.innerWidth<=768?false:true;
      return (
      
            <div className="QuickViewPage-Content">
              <div className="QuickView-Left">
                <div className="Product-Image-Container">
                  <ImageGallery items={images} thumbnailPosition='left'  showThumbnails={showThumb} showPlayButton={false} showFullscreenButton={false} showBullets={true}/>
                </div>
              </div>
              <div className="QuickView-Right">
                <div className="QuickView-Name">
                  {this.props.all_products.id[this.props.id].name}
                </div>
                <div className="QuickView-Price-And-Rating">

                  <div className="QuickView-Price">
                    ${this.props.all_products.id[this.props.id].price}
                  </div>
                  <div className="QuickView-Rating">
                    <StarRatings
                      rating={parseFloat(this.props.all_products.id[this.props.id].rating, 10)}
                      starRatedColor="#ff6008"
                      numberOfStars={5}
                      starSpacing="5px"
                      starDimension="20px"
                      name='rating'
                    />
                    <span>{this.props.all_products.id[this.props.id].rating} of 5</span>
                  </div>
                </div>

                <div className="QuickView-Descriptions">
                  Description
                <p>
                    {this.props.all_products.id[this.props.id].description}
                  </p>
                </div>
                <div className="QuickView-Sizes" >
                  <div className="Size-Label">
                    Sizes
                  </div>
                  <div className="Sizes">
                    <div> S </div> <div> M  </div> <div> L </div> <div> XL </div>  <div> XXL</div>
                  </div>
                </div>
                <div className="QuickView-Kit" >
                  <div className="Kit-Label"><p>Kit</p></div>
                  <div className="Kit">
                    <div className="Kit-Home">HOME</div><div className="Kit-Away">AWAY</div><div className="Kit-Third">THIRD</div>
                  </div>
                </div>

                <div className="QickView-Quandity">
                  <div className="QickView-Quandity-Label">Qty</div>
                  <div className="QuickView-Inc-And-Dec">
                    <div className="QuickView-Decrement" onClick={this.decrement}>
                      <img src="/assets/decrement.svg" alt="decrement" />
                    </div >
                    <div>{this.state.count}</div>

                    <div className="QuickView-Increment" onClick={this.increment}>
                      <img src="/assets/increment.svg" alt="increment" />
                    </div>
                  </div>
                </div>
                <div className="QuickView-AddToCart" onClick={this.addToCart} >
                  <p>ADD TO CART</p>
                </div>


              </div>
              <div className="QuickView-Bottom" onClick={this.changeToProductDetail} style={{display:this.props.productDetailButtonShow}}>
                <img src="/assets/view_product.svg" alt="products" />
              </div>
            </div>

      );
    }
    else{
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickView);