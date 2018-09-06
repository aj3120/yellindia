import React, { Component } from 'react';
import { push } from "react-router-redux";
import { showMenuAction } from '../actions/showMenuAction';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ showMenuAction, push }, dispatch) })
}
class MenuAparels extends Component {
    constructor(props) {
        super(props);
        let show_main_flag=window.innerWidth<768?'none':'block';
        this.state = {
            show_apparels:show_main_flag,
            show_jumpsuits: 'none', show_jumpsuits_opposite: 'inline-block', show_shirts: 'none', show_shirts_opposite: 'inline-block',
            show_tops: 'none', show_tops_opposite: 'inline-block', show_shorts: 'none', show_shorts_opposite: 'inline-block',
            show_trousers: 'none', show_trousers_opposite: 'inline-block',




        }
    }
    onJumpSuits = () => {
        let show = this.state.show_jumpsuits === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_jumpsuits === 'none' ? 'none' : 'inline-block';
        this.setState({
            show_jumpsuits: show, show_jumpsuits_opposite: hide, show_shirts: 'none', show_shirts_opposite: 'inline-block',
            show_tops: 'none', show_tops_opposite: 'inline-block', show_shorts: 'none', show_shorts_opposite: 'inline-block',
            show_trousers: 'none', show_trousers_opposite: 'inline-block'
        })
    }
    onShirts = () => {
        let show = this.state.show_shirts === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_shirts === 'none' ? 'none' : 'inline-block';
        this.setState({
            show_jumpsuits: 'none', show_jumpsuits_opposite: 'inline-block', show_shirts: show, show_shirts_opposite: hide,
            show_tops: 'none', show_tops_opposite: 'inline-block', show_shorts: 'none', show_shorts_opposite: 'inline-block',
            show_trousers: 'none', show_trousers_opposite: 'inline-block',
        })
    }
    onShorts = () => {
        let show = this.state.show_shorts === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_shorts === 'none' ? 'none' : 'inline-block';
        this.setState({
            show_jumpsuits: 'none', show_jumpsuits_opposite: 'inline-block', show_shirts: 'none', show_shirts_opposite: 'inline-block',
            show_tops: 'none', show_tops_opposite: 'inline-block', show_shorts: show, show_shorts_opposite: hide,
            show_trousers: 'none', show_trousers_opposite: 'inline-block',
        })
    }
    onTops = () => {
        let show = this.state.show_tops === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_tops === 'none' ? 'none' : 'inline-block';
        this.setState({
            show_jumpsuits: 'none', show_jumpsuits_opposite: 'inline-block', show_shirts: 'none', show_shirts_opposite: 'inline-block',
            show_tops: show, show_tops_opposite: hide, show_shorts: 'none', show_shorts_opposite: 'inline-block',
            show_trousers: 'none', show_trousers_opposite: 'inline-block',
        })
    }

    showMenu = (event) => {
        let show = this.state.showMenuFlag === 'none' ? 'block' : 'none';
        let hide = this.state.showMenuFlag === 'none' ? 'none' : 'block';
        this.props.action.showMenuAction({ showMenuFlag: show, showMenuFlagOpposite: hide })
        this.props.action.push(`/jumpsuits/${event.target.id}`)
    }
    showApparels=()=>{
        let show = this.state.show_apparels === 'none' ? 'block' : 'none';
        this.setState({ show_apparels:show})
    }
    render() {
        let show_jumpsuits_style = this.state.show_jumpsuits === 'inline-block' ? { opacity: '1', height: '100%', transition: 'opacity 0.4s ease-in' } : { opacity: '0', height: '0px', transition: 'all 0.2s ease-out' }
        let show_shirts_style = this.state.show_shirts === 'inline-block' ? { opacity: '1', height: '100%', transition: 'opacity 0.4s ease-in' } : { opacity: '0', height: '0px', transition: 'all 0.2s ease-out' }
        let show_shorts_style = this.state.show_shorts === 'inline-block' ? { opacity: '1', height: '100%', transition: 'opacity 0.4s ease-in' } : { opacity: '0', height: '0px', transition: 'all 0.2s ease-out' }
        let show_tops_style = this.state.show_tops === 'inline-block' ? { opacity: '1', height: '100%', transition: 'opacity 0.4s ease-in' } : { opacity: '0', height: '0px', transition: 'all 0.2s ease-out' }
        return (
            <div className="Apparels">
                <div className="Apparels-Heading" onClick={this.showApparels}>
                <i id="heading-arrow" className="right"/> <h3>Apparels</h3>
                </div>
                <div className="Apparels-Content" style={{display:this.state.show_apparels}}>
                    <div className="Jumpsuits">
                        <div className="Jumpsuits-Heading" onClick={this.onJumpSuits}>
                            <i className="right" style={{ display: this.state.show_jumpsuits_opposite }} /> <i className="down" style={{ display: this.state.show_jumpsuits }} /> <span>JUMPSUITS</span>
                        </div>
                        <div className="Jumpsuits-Item" style={show_jumpsuits_style}>
                            <div style={{ display: this.state.show_jumpsuits }}>
                                <p id="1" onClick={this.showMenu}> JACKET </p>
                                <p>JUMPSUITS 2</p>
                                <p>JUMPSUITS 3</p>
                            </div>
                        </div>

                    </div>
                    <div className="Shirts">
                        <div className="Shirts-Heading" onClick={this.onShirts}>
                            <i className="right" style={{ display: this.state.show_shirts_opposite }} /> <i className="down" style={{ display: this.state.show_shirts }} /> <span>SHIRTS</span>
                        </div>
                        <div className="Shirts-Item" style={show_shirts_style}>

                            <div style={{ display: this.state.show_shirts }}>
                                <p id="2" onClick={this.showMenu}> JERSEY</p>
                                <p>SHIRTS 2</p>
                                <p>SHIRTS 3</p>
                            </div>
                        </div>
                    </div>
                    <div className="Tops">
                        <div className="Tops-Heading" onClick={this.onTops}>
                            <i className="right" style={{ display: this.state.show_tops_opposite }} /> <i className="down" style={{ display: this.state.show_tops }} /> <span>TOPS</span>
                        </div>
                        <div className="Tops-Item" style={show_tops_style} >

                            <div style={{ display: this.state.show_tops }}>
                                <p>TOPS 1</p>
                                <p>TOPS 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="Shorts">
                        <div className="Shorts-Heading" onClick={this.onShorts}>
                            <i className="right" style={{ display: this.state.show_shorts_opposite }} /> <i className="down" style={{ display: this.state.show_shorts }} /> <span>SHORTS</span>
                        </div>
                        <div className="Shorts-Item" style={show_shorts_style}>
                            <div style={{ display: this.state.show_shorts }}>
                                <p>SHORTS 1</p>
                                <p>SHORTS 2</p>
                                <p>SHORTS 3</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(MenuAparels));
