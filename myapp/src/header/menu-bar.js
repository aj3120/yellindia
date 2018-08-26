import React, { Component } from 'react';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialLogin from '../social-login';
import {logoutAction} from '../actions/logout_action';
const mapStateToProps=(state)=>{
    return({count:state.cart_products_reducer.cart_products.length,
            loginStatus:state.login_reducer.login_details.status,
            name:state.login_reducer.login_details.name,
            image:state.login_reducer.login_details.image
        })
}
const mapDispatchToProps=(dispatch)=>{
    return({action:bindActionCreators({push,logoutAction},dispatch)})
}
class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state={showSocialFlag:'none'}
    }
    goCart=()=>{
        this.props.action.push('/cart');
    }
    goHome=()=>{
        this.props.action.push('/');
    }
    showSocialLogin=()=>{
        this.state.showSocialFlag==='none'?
        this.setState({showSocialFlag:'flex'}):
        this.setState({showSocialFlag:'none'})

    }
    logout=()=>{
        this.props.action.logoutAction({status:false})
    }
    render() {
        let showLogin=this.props.loginStatus===false?'flex':'none';
        let showWelcome=this.props.loginStatus===true?'flex':'none';
        return (

            <div className="Menu-Bar">
                <div className="Menu-Content">
                    <div className="Mobile-Menu-Button">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="Menu-Left">
                        <div className="Logo" onClick={this.goHome}>
                            <img src="assets/group-2.svg" alt="logo" />
                        </div>
                        <div className="Shop">
                            <p>SHOP</p>
                            <div className="ShopArrow"></div>
                        </div>


                        <div className="Outlet">
                            <p>OUTLET</p>
                            <div className="ShopArrow"></div>
                        </div>
                        <div className="Stores">
                            <p>STORES</p>
                            <div className="ShopArrow"></div>
                        </div>
                    </div>
                    <div className="Menu-Right">
                        {/* Containers are used for hiding the inner element in mobile screen */}
                        <div className="Login-Container">
                        <div className="Login" style={{display:showLogin}} onClick={this.showSocialLogin}>
                            <div >LOGIN</div>
                            <div className="Social-Login-Container" style={{display:this.state.showSocialFlag}}>
                                <SocialLogin/>
                            </div>
                        </div>
                        </div>
                        <div className="Welcome-Container">
                        <div className="Welcome" style={{display:showWelcome}} >
                            <div className="Welcome-Name"><span id="Welcome-Message">Welcome, </span>{this.props.name} </div>
                            <div className="Profile-Pic"> <img src={this.props.image} title="Click here to logout" alt="profilepic" onClick={this.logout}/></div>
                        </div>
                        </div>
                        <div className="Search">
                            <img src="assets/shape_2.svg" alt="search" />
                        </div>
                        <div className="Wishlist">
                            <img src="assets/shape.svg" alt="wishlist" />
                        </div>
                        <div className="Cart-List" >
                            <div className="Cart-Count"  onClick={this.goCart}>
                            <div className="Count" >
                            {this.props.count}
                            </div>
                            
                            </div>
                            <img src="assets/cart.svg" alt="cart" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(MenuBar)
