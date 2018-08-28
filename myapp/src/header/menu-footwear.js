import React, { Component } from 'react';
class Footwear extends Component {
    render() {
        return (

            <div className="Footwear">
                <div className="Footwear-Heading">
                    <h3>Footwear</h3>
                </div>
                <div className="Footwear-Content">
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

export default Footwear;
