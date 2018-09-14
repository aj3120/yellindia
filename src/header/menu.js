import React, { Component } from 'react';
import {connect} from 'react-redux';
import './menu.css'
import Footwear from './Footwear';
import OuterWear from './Outerwear';
import Aparels from './MenuAparels';
import Accessories from './MenuAccessories';
import Bags from './Bags';
import Care from './Care'
const mapStateToProps=(state)=>{
    return({
        showMenu:state.app_helper_reducer.showMenu
        })
}
class Menu extends Component {
    render() {
        const menu_style=this.props.showMenu.showMenuFlag==='block'?
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
