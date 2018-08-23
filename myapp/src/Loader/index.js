import React, { PureComponent } from 'react';
import './loader.css'
class Loader extends PureComponent {
    render() {
        return (
            <div className="Loader">
                <div className="Loader-Image">
                    <img src="/images/loader.gif" alt="loader"/>
                </div>
            </div>
        );

    }
}
export default Loader;