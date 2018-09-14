import  { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './product.css';

const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ }, dispatch) })
}
class LikeProduct extends Component {

    render() {
       
            return null
        
    }
}

export default connect(null, mapDispatchToProps)(LikeProduct);
