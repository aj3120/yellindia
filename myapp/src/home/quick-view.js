import React, { Component } from 'react';
import './home.css';
import './quickview.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const mapStateToProps = (state) => {
  return ({ all_products: state.all_products_reducer.all_products })
}
const mapDispatchToProps = (dispatch) => {
  return ({ action: bindActionCreators({}, dispatch) })
}
class QuickView extends Component {
  render() {
    if (this.props.id !== null) {
      const images = [
        {
          original: this.props.all_products.id[this.props.id].image,
          thumbnail: this.props.all_products.id[this.props.id].image,
        }

      ]
      return (
        <div className="QuickViewPage-Container" style={{ display: this.props.disp }}>
          <div className="QuickViewPage">
            <div className="QuickViewPage-Heading">
              <div>{this.props.all_products.id[this.props.id].name}</div>
              <div>
                <img src="assets/close.png" onClick={() => this.props.callClosePage()} alt="close" />
              </div>
            </div>
            <div className="QuickViewPage-Content">
              <div className="QuickView-Left">
                <div className="Product-Image-Container">
                  <ImageGallery items={images} thumbnailPosition='left' showFullscreenButton={false} showPlayButton={false}  />
                </div>
              </div>
              <div className="QuickView-Right">
                <div className="QuickView-Name">
                  {this.props.all_products.id[this.props.id].name}
                </div>
                <div className="QuickView-Price">
                  ${this.props.all_products.id[this.props.id].price}
                </div>

                <div className="QuickView-Descriptions">
                  Description
                <p>
                    {this.props.all_products.id[this.props.id].description}
                  </p>
                </div>
                <div class="QuickView-Sizes" >
                  <div>
                    Sizes
                  </div>
                  <div class="Sizes">
                  <div> S </div> <div> M  </div> <div> L </div> <div> XL </div>  <div> XXL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          >
        </div>
      );
    }
    else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickView);