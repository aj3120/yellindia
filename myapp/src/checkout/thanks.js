import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import './thanks.css'
const mapStateToProps = (state) => {
    return ({login_details:state.login_reducer.login_details
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ push }, dispatch) })
}

class Thanks extends Component {

    render() {
        let email=this.props.login_details.email===undefined? 'aj3120@gmail.com' : this.props.login_details.email
        return (
            <div className="Thanks">
                <div className="Thanks-Header">
                    <div><p>Success</p></div>
                </div>
                <div className="Thanks-Content">
                    <div className="Thanks-Title">
                        <p>Thank you, your order has been placed</p>
                    </div>
                    <div className="Thanks-Description">
                        <p>Your reference number is #1234abc.</p>
                        <p>An order confirmation email has been sent to</p>
                    </div>
                    <div className="Thanks-Email">
                        {email}}
                    </div>
                    <div className="Send-Email">
                        send confirmation to another email
                    </div>
                </div>
                
                <div className="Thanks-Continue-Shopping" onClick={()=>this.props.action.push('/')}>
                CONTINUE SHOPPING
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thanks);
