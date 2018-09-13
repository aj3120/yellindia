import React, { Component } from 'react';
import {connect} from 'react-redux';
import './menu.css'
import Footwear from './menu-footwear';
import OuterWear from './menu-outerwear';
import Aparels from './menu-Aparels';
import Accessories from './menu-accessories';
import Bags from './menu-bags';
import Care from './menu-careabout'
const mapStateToProps=(state)=>{
    return({
        showMenu:state.app_helper_reducer.showMenu
        })
}
class Menu extends Component {
    render() {
        let menu_style=this.props.showMenu.showMenuFlag==='block'?
                        {
                            maxHeight: '100%',
                            transition:'max-height 2s',
                            opacity:1,
                            visibility:'visible',
                            overflow:'auto'
                        }
                        :
                        {
                            opacity:0,
                            visibility:'hidden',
                            maxHeight: '0px',
                            transition:'max-height 2s',
                        }
        return (
            


            <div className="Menu-Window-Container" style={menu_style}>
                <div className="Menu-Items">
                    <Aparels/>
                    <Accessories/>
                    <Bags/>
                    <Care/>
                    <Footwear/>
                    <OuterWear/>
                        
                    
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps,null)(Menu)
