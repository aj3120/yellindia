import React, { Component } from 'react';
import './footer.css'
class Footer extends Component {
    render() {
        return (
            <div className="Footer-Container">
                <div className="Footer">
                    <div className="Categories">
                        <div className="Categories-Title">
                            Categories
                       </div>
                        <div className="Categories-Content">
                            <p>About us</p>
                            <p>Testimonials</p>
                            <p>Contact</p>
                            <p>Journal</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                    <div className="Partners">
                        <div className="Partners-Title">
                            Partners
                         </div>
                        <div className="Partners-Content">
                            <p>Support</p>
                            <p>Shipping & Returns</p>
                            <p>Size Guide</p>
                            <p>Product Care</p>

                        </div>
                    </div>
                    <div className="ContactUs">
                        <div className="ContactUs-Title">
                            Contact us
                         </div>
                        <div className="ContactUs-Content">
                            <p>26A, Netaji Aparel Park</p>
                            <p>Tirupur, India, 641601</p>
                            <br />
                            <p>+91 421 220 1550</p>
                        </div>
                    </div>
                    <div className="SubscribeNewsletter">
                        <div className="Subscribe-Title">
                            Subscribe to newsletter
                        </div>
                        <div className="Subscribe-Inputs">

                            <div className="EmailBox">
                                <input type="email" placeholder="ENTER YOUR NAME" />
                            </div>
                            <div className="SubscribeButton">
                                <img src="assets/subscribe.svg" alt="subscribe"/>
                            </div>
                        </div>
                        <div className="Subscribe-Images">
                            <img src="" />
                            <img src="" />
                        </div>
                    </div>
                </div>
                <div className="Copyright">
                    {'\u00A9'} Copyright YELL INDIA, 2018
                </div>
                <div className="Copyright-Mobile">
                    {'\u00A9'} YELL INDIA World Cup Kits 2018
                </div>
            </div>
        );
    }
}

export default Footer;