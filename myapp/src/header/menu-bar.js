import React, { Component } from 'react';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialLogin from '../social-login';
import {logoutAction} from '../actions/logout_action';
import {showMenuAction} from '../actions/showMenuAction'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {addNotificationFunction} from '../actions/add_notification_function';
import {searchTextAction} from '../actions/search_text_action';
const mapStateToProps=(state)=>{
    return({count:state.cart_products_reducer.cart_products.length,
            loginStatus:state.login_reducer.login_details.status,
            name:state.login_reducer.login_details.name,
            image:state.login_reducer.login_details.image,
            showMenu:state.app_helper_reducer.showMenu,
            notificationFunction:state.app_helper_reducer.notificationFunction
            
        })
}
const mapDispatchToProps=(dispatch)=>{
    return({action:bindActionCreators({push,logoutAction,showMenuAction,addNotificationFunction,searchTextAction},dispatch)})
}
class MenuBar extends Component {
    constructor(props){
        super(props);
       
        this.state={showSocialFlag:'none',searchText:'',searchBox:'none'}
    }
    goCart=()=>{
        this.props.action.push('/cart');
    }
    goHome=()=>{
        this.props.action.showMenuAction({showMenuFlag: 'none', showMenuFlagOpposite: 'block' })
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
    showMenu=()=>{
        let show = this.props.showMenu.showMenuFlag=== 'none' ? 'block' : 'none';
        let hide = this.props.showMenu.showMenuFlag === 'none' ? 'none' : 'block';
        this.props.action.showMenuAction({ showMenuFlag: show, showMenuFlagOpposite: hide })
    }

    createNotification = () => {
        return () =>NotificationManager.success('Added To Cart','',5000);   
        };
    componentWillMount(){
        this.props.action.addNotificationFunction(this.createNotification())
    }  
    SearchValueChange=(event)=>{
        this.setState({searchText:event.target.value})
        this.props.action.searchTextAction(event.target.value)
      }   
    searchBox=()=>{
        this.state.searchBox==='none'?this.setState({searchBox:'block'}):this.props.action.push('/search')
    }  
    render() {
        const showLogin=this.props.loginStatus===false?'flex':'none';
        const showWelcome=this.props.loginStatus===true?'flex':'none';
        return (

            <div className="Menu-Bar">
                <div className="Menu-Content">
                    <div className="Mobile-Menu-Button" onClick={this.showMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="Menu-Left">
                        <div className="Logo" onClick={this.goHome}>
                            <img src="/assets/group-2.svg" alt="logo" />
                        </div>
                        <div className="Shop" onClick={this.showMenu}>
                            <p>SHOP</p>
                            <div><i className="menu-up" style={{ display: this.props.showMenu.showMenuFlag}} /> <i className="menu-down" style={{ display: this.props.showMenu.showMenuFlagOpposite}}/></div>
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
                            <input id="search" type="text" style={{display:this.state.searchBox}} value={this.state.searchText} onChange={this.SearchValueChange}/>
                            <img src="/assets/shape_2.svg" alt="search" onClick={this.searchBox} />
                        </div>
                        <div className="Wishlist" >
                            <img src="/assets/shape.svg" alt="wishlist" />
                        </div>
                        <div className="Cart-List" onClick={this.goCart}  >
                            <div className="Cart-Count"  >
                            <div className="Count" >
                            {this.props.count}
                            </div>
                           
                            </div>
                            <img src="/assets/cart.svg" alt="cart" />
                        </div>
                    </div>
                </div>
                <NotificationContainer enterTimeout={100} />
            </div>
        )
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(MenuBar)
