import React, { Component } from 'react';
class Bags extends Component {
    constructor(props) {
        super(props);
        const show_main_flag=window.innerWidth<768?'none':'block';
        this.state = { show_bags:show_main_flag,show_house: 'none', show_house_opposite: 'inline-block', show_gifts: 'none', show_gifts_opposite: 'inline-block' }
    }
    onHouse = () => {
        const show = this.state.show_house === 'none' ? 'inline-block' : 'none';
        const hide = this.state.show_house === 'none' ? 'none' : 'inline-block';
        this.setState({ show_house: show, show_house_opposite: hide, show_gifts: 'none', show_gifts_opposite: 'inline-block' })
    }
    onGifts = () => {
        const show = this.state.show_gifts === 'none' ? 'inline-block' : 'none';
        const hide = this.state.show_gifts === 'none' ? 'none' : 'inline-block';
        this.setState({ show_house: 'none', show_house_opposite: 'inline-block', show_gifts: show, show_gifts_opposite: hide })
    }
    showBags=()=>{
        const show = this.state.show_bags === 'none' ? 'block' : 'none';
        this.setState({ show_bags:show})
    }
    render() {


        const show_house_style = this.state.show_house === 'inline-block' ? { opacity: '1', height: '100%', transition: 'opacity 0.4s ease-in' } : { opacity: '0', height: '0px', transition: 'all 0.2s ease-out' }
        const show_gifts_style = this.state.show_gifts === 'inline-block' ? { opacity: '1', height: '100%', transition: 'opacity 0.4s ease-in' } : { opacity: '0', height: '0px', transition: 'all 0.2s ease-out' }

        return (

            <div className="Bags">
                <div className="Bags-Heading"  onClick={this.showBags}> 
                <i className="right" id="heading-arrow"/> <h3>Bags</h3>
                </div>
                <div className="Bags-Content" style={{display:this.state.show_bags}}>
                    <div className="Houseware">
                        <div className="Houseware-Heading" onClick={this.onHouse}>
                            <i className="right" style={{ display: this.state.show_house_opposite }} /> <i className="down" style={{ display: this.state.show_house }} /> <span>HOUSEWARE</span>
                        </div>
                        <div className="Houseware-Item" style={show_house_style}>
                            <div style={{ display: this.state.show_house }} >
                                <p>HOUSEWARE 1</p>
                                <p>HOUSEWARE 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="Giftcard">
                        <div className="Giftcard-Heading" onClick={this.onGifts}>
                            <i className="right" style={{ display: this.state.show_gifts_opposite }} /> <i className="down" style={{ display: this.state.show_gifts }} /> <span>GIFT CARDS</span>
                        </div>
                        <div className="Giftcard-Item" style={show_gifts_style}>
                            <div style={{ display: this.state.show_gifts }} >
                                <p>GIFT CARDS 1</p>
                                <p>GIFT CARDS 2</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Bags;
