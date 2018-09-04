import React, { Component } from 'react';
class Care extends Component {
    constructor(props) {
        super(props);
        let show_main_flag=window.innerWidth<768?'none':'block';
        this.state = { show_care_about:show_main_flag}
    }    
    showCareAbout=()=>{
        let show = this.state.show_care_about === 'none' ? 'block' : 'none';
        this.setState({ show_care_about:show})
    }
    render() {
        return (

            <div className="Care">
                <div className="Care-Heading" onClick={this.showCareAbout}>
                    <h3>Care About</h3>
                </div>
                <div className="Care-Content" style={{display:this.state.show_care_about}}>
                    <div className="Sale">
                        <div className="Sale-Heading">
                             <span>SALE/LASR CALL</span>
                        </div>
                       
                    </div>
                    <div className="Essentials">
                        <div className="Essentials-Heading">
                            <span>ESSENTIALS</span>
                        </div>
                      
                    </div>


                </div>
            </div>
        );
    }
}

export default Care;
