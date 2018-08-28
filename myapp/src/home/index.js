import React, { Component } from 'react';
import './home.css';
import TitleImage from './title-image';
import Products from './products';
import About from './about';
import Shop from './shop';
import QuickViewContainer from './quick-view-container'
class Home extends Component {
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
    return (
      <div className="Home">
          <TitleImage/>
          <Products callQuickPage={this.displayQuickViewPage}/>
          <QuickViewContainer disp={this.state.dispQuickView} id={this.state.id} callClosePage={this.closeQuickViewPage} productDetailButtonShow={"flex"}/>
          <About/>
          <Shop/>
      </div>
    );
  }
}

export default Home;
