
import { Carousel } from 'react-bootstrap';
import React, { Component } from 'react';
class TitleImage extends Component {
    render() {
        return (
            <div>
                <div className="Carousel-Image">
                    <div className="Carousel-Title">
                        <p>Perfect<br />Style, Fit, Comfort</p>
                    </div>
                    <div className="Carousel-Button" >
                        <a href="#shome-home-jump">
                            <img src="assets/m.png" alt="shop" />
                        </a>
                    </div>
                    <Carousel
                            interval={3000} nextIcon={<img src="assets/arrow-right.svg"/>} prevIcon={<img src="assets/arrow-left.svg" alt="Pic1" />}
                    >
                        <Carousel.Item>
                            <img src="assets/2.jpeg" alt="Pic1" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="assets/1.jpeg" alt="Pic2" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="assets/2.jpeg" alt="Pic3" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="assets/3.jpeg" alt="Pic4" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="assets/1.jpeg" alt="Pic5" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="assets/2.jpeg" alt="Pic6" />
                        </Carousel.Item>
                    </Carousel>

                  
                </div>
            </div>
        );

    }
}

export default TitleImage;
