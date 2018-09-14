import React, { Component } from 'react';

class StatusView1 extends Component {
    render() {
        return (
            <div className="Checkout-Status">
                <div className="Status-Line">
                </div>
                <div className="Shipping-Status">
                    <div className="Shipping-Status-Icon" style={{backgroundColor:"#0097a7"}}>
                        <div className="Shipping-Status-Check">
                          1
                        </div>
                    </div>
                    <div className="Shipping-Status-Label">
                        Shipping
                        </div>
                </div>
                <div className="Payment-Status">
                    <div className="Payment-Status-Icon">
                        2
                        </div>
                    <div className="Payment-Status-Label">
                        Payment
                        </div>
                </div>
                <div className="Review-Status">
                    <div className="Review-Status-Icon">
                        3
                        </div>
                    <div className="Review-Status-Label">
                        Review
                        </div>
                </div>
            </div>
        )
    }
}
export default StatusView1