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
            let login_details = { status: true, api: 'facebook', id: event.id, name: event.name, email: event.email, image: event.picture.data.url }
            this.props.action.loginAction(login_details);
        }

    };

    googleResponse = (event) => {
        if (event.profileObj !== undefined) {
            let login_details = { status: true, api: 'google', id: event.profileObj.googleId, name: event.profileObj.name, email: event.profileObj.email, image: event.profileObj.imageUrl }
            this.props.action.loginAction(login_details);
        }
    };

  
    render() {
            let view=this.props.callFrom==='menu'||window.innerWidth<768?{height:'36px'}:{height:'56px'}
            let height=this.props.callFrom==='menu'||window.innerWidth<768?"36px":"100%";
            let width=this.props.callFrom==='menu'||window.innerWidth<768?"120px":"100%";
            let src_google=this.props.callFrom==='menu'||window.innerWidth<768?"/assets/google.jpg":"/assets/google_big.jpg";
            let src_facebook=this.props.callFrom==='menu'||window.innerWidth<768?"/assets/facebook.svg":"/assets/facebook_big.png";
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
