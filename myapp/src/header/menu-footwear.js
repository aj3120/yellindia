import React, { Component } from 'react';
class Footwear extends Component {
    constructor(props) {
        super(props);
        let show_main_flag=window.innerWidth<768?'none':'block';
        this.state = { show_footwear:show_main_flag}
    }    
    showFootwear=()=>{
        let show = this.state.show_footwear === 'none' ? 'block' : 'none';
        this.setState({ show_footwear:show})
    }
    render() {
        return (

            <div className="Footwear">
                <div className="Footwear-Heading" onClick={this.showFootwear}>
                <i className="right" id="heading-arrow"/> <h3>Footwear</h3>
                </div>
                <div className="Footwear-Content" style={{display:this.state.show_footwear}}>
                    <div className="Block">
                        <div className="Block-Heading">
                        <i className="right" id="free-arrow-for-spacing" /><span>BLOCK PRINTING</span>
                        </div>
                       
                    </div>
                    <div className="Ikat">
                        <div className="Ikat-Heading">
                        <i className="right" id="free-arrow-for-spacing" /> <span>IKAT</span>
                        </div>
                      
                    </div>

                     <div className="Jamdani">
                        <div className="Jamdani-Heading">
                        <i className="right" id="free-arrow-for-spacing" /> <span>JAMDANI</span>
                        </div>
                      
                    </div>
                    <div className="Handloom">
                        <div className="Handloom-Heading">
                        <i className="right" id="free-arrow-for-spacing" /> <span>HANDLOOM</span>
                        </div>
                      
                    </div>

                </div>
            </div>
        );
    }
}

export default Footwear;
