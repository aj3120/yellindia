import React, { Component } from 'react';
class Bags extends Component {
    constructor(props) {
        super(props);
        this.state = { show_house: 'none', show_house_opposite: 'inline-block', show_gifts: 'none', show_gifts_opposite: 'inline-block'}
    }
    onHouse = () => {
        let show = this.state.show_house === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_house === 'none' ? 'none' : 'inline-block';
        this.setState({ show_house: show, show_house_opposite: hide })
    }
    onGifts = () => {
        let show = this.state.show_gifts === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_gifts === 'none' ? 'none' : 'inline-block';
        this.setState({ show_gifts: show, show_gifts_opposite: hide })
    }
    render() {
        return (

            <div className="Bags">
                <div className="Bags-Heading">
                    <h3>Bags</h3>
                </div>
                <div className="Bags-Content">
                    <div className="Houseware">
                        <div className="Houseware-Heading"  onClick={this.onHouse}>
                            <i className="right" style={{ display: this.state.show_house_opposite }}/> <i className="down"style={{ display: this.state.show_house}}/> <span>HOUSEWARE</span>
                        </div>
                        <div className="Houseware-Item" style={{ display: this.state.show_house}}>
                            <p>HOUSEWARE 1</p>
                            <p>HOUSEWARE 2</p>
                        </div>
                    </div>
                    <div className="Giftcard">
                        <div className="Giftcard-Heading"  onClick={this.onGifts}>
                            <i className="right" style={{ display: this.state.show_gifts_opposite}}/> <i className="down"style={{ display: this.state.show_gifts}} /> <span>GIFT CARDS</span>
                        </div>
                        <div className="Giftcard-Item"style={{ display: this.state.show_gifts}}>
                            <p>GIFT CARDS 1</p>
                            <p>GIFT CARDS 2</p>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Bags;
