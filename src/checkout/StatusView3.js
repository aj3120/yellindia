import React, { Component } from 'react';
class StatusView3 extends Component {
    render() {
        return (
            <div className="Checkout-Status">
                <div className="Status-Line">
                </div>
                <div className="Shipping-Status">
                    <div className="Shipping-Status-Icon" style={{backgroundColor:"#0097a7"}}>
                        <div className="Shipping-Status-Check">
                          <img src="assets/check.png" alt="check"/>
                        </div>
                    </div>
                    <div className="Shipping-Status-Label">
                        Shipping
                        </div>
                </div>
                <div className="Payment-Status" >
                    <div className="Payment-Status-Icon" style={{backgroundColor:"#0097a7"}}>
                         <img src="assets/check.png" alt="check"/>
                        </div>
                    <div className="Payment-Status-Label">
                        Payment
                        </div>
                </div>
                <div className="Review-Status" >
                    <div className="Review-Status-Icon" style={{backgroundColor:"#0097a7"}}>
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
export default StatusView3