import React, { Component } from 'react';
class OuterWear extends Component {
    constructor(props) {
        super(props);
        let show_main_flag=window.innerWidth<768?'none':'block';
        this.state = { show_outerwear:show_main_flag}
    }    
    showOuterWear=()=>{
        let show = this.state.show_outerwear === 'none' ? 'block' : 'none';
        this.setState({ show_outerwear:show})
    }
    render() {
        return (

            <div className="OuterWear">
                <div className="OuterWear-Heading" onClick={this.showOuterWear}>
                    <h3>Footwear</h3>
                </div>
                <div className="OuterWear-Content" style={{display:this.state.show_outerwear}}>
                    <div className="Block">
                        <div className="Block-Heading">
                             <span>BLOCK PRINTING</span>
                        </div>
                       
                    </div>
                    <div className="Ikat">
                        <div className="Ikat-Heading">
                            <span>IKAT</span>
                        </div>
                      
                    </div>

                     <div className="Jamdani">
                        <div className="Jamdani-Heading">
                            <span>JAMDANI</span>
                        </div>
                      
                    </div>
                    <div className="Handloom">
                        <div className="Handloom-Heading">
                            <span>HANDLOOM</span>
                        </div>
                      
                    </div>

                </div>
            </div>
        );
    }
}

export default OuterWear;
