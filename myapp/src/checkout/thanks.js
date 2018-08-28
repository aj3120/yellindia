import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps = () => {
    return ({ })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({}, dispatch) })
}

class Thanks extends Component {
   
    render() {
     return(
        <h3>Thanks</h3>
     )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thanks);
