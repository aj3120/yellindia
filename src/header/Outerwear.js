import React, { Component } from 'react';
class OuterWear extends Component {
    constructor(props) {
        super(props);
        const show_main_flag=window.innerWidth<768?'none':'block';
        this.state = { show_outerwear:show_main_flag}
    }    
    showOuterWear=()=>{
        const show = this.state.show_outerwear === 'none' ? 'block' : 'none';
        this.setState({ show_outerwear:show})
    }
    render() {
        return (

            <div className="OuterWear">
                <div className="OuterWear-Heading" onClick={this.showOuterWear}>
                <i className="right" id="heading-arrow"/ >  <h3>Footwear</h3>
                </div>
                <div className="OuterWear-Content" style={{display:this.state.show_outerwear}}>
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

export default OuterWear;
