import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import {connect} from 'react-redux';
import { bindActionCreators } from '../../../../../../../.cache/typescript/2.9/node_modules/redux';
import {loginAction} from '../actions/login-action'
const mapStateToProps=(state)=>{

}
const mapDispatchToProps=(dispatch)=>{
    return(
        {action:bindActionCreators({loginAction},dispatch)}
    )
    
}
class SocailLogin extends Component {
   
    facebookResponse = (event) => {
        if(event.id!==undefined){
            let login_details={status:true,api:'facebook',id:event.id,name:event.name,email:event.email,image:event.picture.data.url}
            this.props.action.loginAction(login_details);
        }
        
    };

    googleResponse = (event) => {console.log(event)
        if(event.profileObj!==undefined)
        {
            let login_details={status:true,api:'google',id:event.profileObj.googleId,name:event.profileObj.name,email:event.profileObj.email,image:event.profileObj.imageUrl}
            this.props.action.loginAction(login_details);
        }
    };

    onFailure = (error) => {
      alert(error);
    }
    render() {
     
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
            <button style={{backgroundColor:'white',border:'none',height:'36px'}} onClick={renderProps.onClick}><img src="assets/facebook.svg" height="36px" width="120px" alt="facebook"/></button>
          )}
        ></FacebookLogin>
        </div>
            <GoogleLogin
                        clientId="337741354060-2v626h8b2gg33esuo5ou995eb8p48hn2.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}

                        style={{backgroundColor:'white',border:'none',height:'36px'}}
                         >
                         <img src="assets/google.jpg" height="36px" width="120px" alt="google"/>
                         </GoogleLogin>

        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SocailLogin);
