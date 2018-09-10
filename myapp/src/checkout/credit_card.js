import React, { Component } from 'react';
import './credit_card.css'
class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card_name_part1: '', card_name_part2: '', card_name_part3: '', card_name_part4: '', month_part1: '',
            month_part2: '', cvv: '',
            card_name_show_upto_three: 'inline-block', card_name_show_part4: 'inline-block', month_show_part1: 'none', month_show_part2: 'none',
            cvv_show: 'none'

        }
        this.cardname_ref2 = React.createRef();
        this.cardname_ref3 = React.createRef();
        this.cardname_ref4 = React.createRef();
        this.month_ref1 = React.createRef();
        this.month_ref2 = React.createRef();
        this.cvv_ref = React.createRef();

    }
    onInputChange = (event) => {
        if (event.target.id === "first-part") {
            if (event.target.value.length <= 4) {
                this.setState({ card_name_part1: event.target.value })
                console.log(this.state.card_name_part1)
            }
            if (event.target.value.length === 4) {
                this.cardname_ref2.current.focus();
            }
        }
        else if (event.target.id === "second-part") {
            if (event.target.value.length <= 4)
                this.setState({ card_name_part2: event.target.value })
            if (event.target.value.length === 4) {
                this.cardname_ref3.current.focus();
            }

        }
        else if (event.target.id === "third-part") {
            if (event.target.value.length <= 4)
                this.setState({ card_name_part3: event.target.value })

            if (event.target.value.length === 4) {
                this.cardname_ref4.current.focus();
            }

        }
        else if (event.target.id === "fourth-part") {
            if (event.target.value.length <= 4)
                this.setState({ card_name_part4: event.target.value })
            if (event.target.value.length === 4) {
                this.setState({ card_name_show_upto_three: 'none', month_show_part1: 'inline-block', month_show_part2: 'inline-block', cvv_show: 'inline-block' })
                setTimeout(() => this.month_ref1.current.focus(), 500);
            }
        }
        else if (event.target.id === "month-part1") {
            if (event.target.value.length <= 2)
                this.setState({ month_part1: event.target.value })
            if (event.target.value.length === 2) {
                this.month_ref2.current.focus();
            }
        }
        else if (event.target.id === "month-part2") {
            if (event.target.value.length <= 4)
                this.setState({ month_part2: event.target.value })
            if (event.target.value.length === 4) {
                this.cvv_ref.current.focus();
            }
        }
        else if (event.target.id === "cvv") {
            if (event.target.value.length <= 3)
                this.setState({ cvv: event.target.value })
        }
    }
    showCardNumber = () => {
        if (this.state.card_name_part4.length === 4 && this.state.card_name_show_upto_three === 'inline-block') {
            this.setState({ card_name_show_upto_three: 'none', month_show_part1: 'inline-block', month_show_part2: 'inline-block', cvv_show: 'inline-block' })
        }
        else {
            this.setState({ card_name_show_upto_three: 'inline-block', month_show_part1: 'none', month_show_part2: 'none', cvv_show: 'none' })
        }

    }
    render() {

        let card_image = this.state.card_name_show_upto_three === 'inline-block' ? "/assets/placeholder.svg" : "/assets/visa_new.jpg"
        return (

            <div className="Payment-Mobile-Credit-Card">
                <div className="Payment-Mobile-Heading"><p>Credit or Debit Card</p></div>
                <div className="Payment-Mobile-Input">
                    <div className="Payment-Mobile-Card_number" style={this.props.credit_box_style}>
                        <img src={card_image} alt="placeholder"  />
                        <input id="first-part" placeholder="1234" onClick={(event)=>this.props.paymentMode(event)}type="number" onChange={this.onInputChange} value={this.state.card_name_part1} style={{ display: this.state.card_name_show_upto_three }} />
                        <input id="second-part" placeholder="1234" ref={this.cardname_ref2} type="number" onChange={this.onInputChange} value={this.state.card_name_part2} style={{ display: this.state.card_name_show_upto_three }} />
                        <input id="third-part" placeholder="1234"   ref={this.cardname_ref3} type="number" onChange={this.onInputChange} value={this.state.card_name_part3} style={{ display: this.state.card_name_show_upto_three }} />
                        <input id="fourth-part" placeholder="1234" onClick={this.showCardNumber} ref={this.cardname_ref4} type="number" onChange={this.onInputChange} value={this.state.card_name_part4} style={{ display: this.state.card_name_show_part4 }} />
                        <input id="month-part1" placeholder="MM" ref={this.month_ref1} onChange={this.onInputChange} type="number" value={this.state.month_part1} style={{ display: this.state.month_show_part1 }} />
                        <p style={{ display: this.state.month_show_part1 }}>/</p>
                        <input id="month-part2" placeholder="YYYY" ref={this.month_ref2} onChange={this.onInputChange} type="number" value={this.state.month_part2} style={{ display: this.state.month_show_part2 }} />

                        <input id="cvv" placeholder="CVV" type="number" ref={this.cvv_ref} onChange={this.onInputChange} value={this.state.cvv} style={{ display: this.state.cvv_show }} />
                    </div>
                    <div className="Credit-Card-Number-Label">
                        <p>Enter card number, expiration date & CVV number</p>
                    </div>

                </div>
            </div>
        );
    }
}
export default CreditCard