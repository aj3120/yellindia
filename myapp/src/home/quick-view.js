import React, { Component } from 'react';
import './home.css';
import './quickview.css'

class QuickView extends Component {
  render() {
    return (
      <div className="QuickViewPage-Container" style={{display:this.props.disp}}>
            <div className="QuickViewPage">
            asdasdsad
            asdasdsadasda
            <img src="assets/close.png" onClick={()=>this.props.callClosePage()} alt="close"/>
            asdasd ::: {this.props.id}
            </div>
      </div>
    );
  }
}

export default QuickView;