import React, { Component } from 'react';
class MenuAccessories extends Component {
    constructor(props) {
        super(props);
        let show_main_flag=window.innerWidth<768?'none':'block';
        this.state = { show_accessories:show_main_flag,show_necklaces: 'none', show_necklaces_opposite: 'inline-block', show_scarfs: 'none', show_carfs_opposite: 'inline-block'}
    }
    onNecklaces = () => {
        let show = this.state.show_necklaces === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_necklaces === 'none' ? 'none' : 'inline-block';
        this.setState({ show_necklaces: show, show_necklaces_opposite: hide ,show_scarfs: 'none', show_scarfs_opposite: 'inline-block'})
    }
    onScarfs = () => {
        let show = this.state.show_scarfs === 'none' ? 'inline-block' : 'none';
        let hide = this.state.show_scarfs === 'none' ? 'none' : 'inline-block';
        this.setState({ show_necklaces: 'none', show_necklaces_opposite: 'inline-block',show_scarfs: show, show_scarfs_opposite: hide })
    }
    showAccessories=()=>{
        let show = this.state.show_accessories === 'none' ? 'block' : 'none';
        this.setState({ show_accessories:show})
    }
    render() {
        let show_necklaces_style=this.state.show_necklaces==='inline-block'?{opacity:'1',height: '100%', transition:'opacity 0.4s ease-in'} :{ opacity:'0',  height: '0px'}
        let show_scarfs_style=this.state.show_scarfs==='inline-block'?{opacity:'1',height: '100%', transition:'opacity 0.4s ease-in'} :{ opacity:'0',  height: '0px'}
       
        return (

            <div className="Accessories">
                <div className="Accessories-Heading" onClick={this.showAccessories}>
                <i className="right" id="heading-arrow"/> <h3>Accessories</h3>
                </div>
                <div className="Accessories-Content" style={{display:this.state.show_accessories}} >
                    <div className="Necklaces">
                        <div className="Necklaces-Heading" onClick={this.onNecklaces}>
                            <i className="right" style={{ display: this.state.show_necklaces_opposite }} /> <i className="down" style={{ display: this.state.show_necklaces }}/> <span>NECKLACES</span>
                        </div>
                        <div className="Necklaces-Item" style={show_necklaces_style}>
                            <div style={{ display: this.state.show_necklaces }}>     
                            <p>NECKLACES 1</p>
                            <p>NECKLACES 2</p>
                            <p>NECKLACES 3</p>
                            </div>
                        </div>
                    </div>
                    <div className="Scarfs">
                        <div className="Scarfs-Heading" onClick={this.onScarfs}>
                            <i className="right" style={{ display: this.state.show_scarfs_opposite }} /> <i className="down" style={{ display: this.state.show_scarfs }} /> <span>SCARFS</span>
                        </div>
                        <div className="Scarfs-Item" style={show_scarfs_style}>
                            <div style={{ display: this.state.show_scarfs }} >
                            <p>SCARFS 1</p>
                            <p>SCARFS 2</p>
                            <p>SCARFS 3</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default MenuAccessories;
