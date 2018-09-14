import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from '../actions/login-action'
const mapDispatchToProps = (dispatch) => {
    return (
        { action: bindActionCreators({ loginAction }, dispatch) }
    )

}
class SocailLogin extends Component {

    facebookResponse = (event) => {
        if (event.id !== undefined) {
            const login_details = { status: true, api: 'facebook', id: event.id, name: event.name, email: event.email, image: event.picture.data.url }
            this.props.action.loginAction(login_details);
        }

    };

    googleResponse = (event) => {
        if (event.profileObj !== undefined) {
            const login_details = { status: true, api: 'google', id: event.profileObj.googleId, name: event.profileObj.name, email: event.profileObj.email, image: event.profileObj.imageUrl }
            this.props.action.loginAction(login_details);
        }
    };

  
    render() {
            const check_callfrom=this.props.callFrom==='menu'||window.innerWidth<768;
            const view=check_callfrom?{height:'36px'}:{height:'56px'}
            const height=check_callfrom?"36px":"100%";
            const width=check_callfrom?"120px":"100%";
            const src_google=check_callfrom?"/assets/google.jpg":"/assets/google_big.jpg";
            const src_facebook=check_callfrom?"/assets/facebook.svg":"/assets/facebook_big.png";
        return (
            
            <div className="Social-Login">
                <div>
                    <FacebookLogin
                        appId="1863503867072630"
                        autoLoad={true}
                        textButton=""
                        fields="name,email,picture"
                        callback={this.facebookResponse}
                        render={renderProps => (
                            <button style={{ backgroundColor: 'white', border: 'none', ...view }} onClick={renderProps.onClick}><img src={src_facebook} height={height} width={width} alt="facebook" /></button>
                        )}
                    ></FacebookLogin>
                </div>
                <div>
                    <GoogleLogin
                        clientId="155669810062-balfgf76r502a1iiu4eaucjpqi1mu144.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}

                        style={{ backgroundColor: 'white', border: 'none', ...view}}
                    >
                        <img src={src_google} height={height} width={width} alt="google" />
                    </GoogleLogin>
                </div>

            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(SocailLogin);
