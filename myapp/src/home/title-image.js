import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React,{Component} from 'react';
class TitleImage extends Component {
  render() {
    return (
    
        <div className="Carousel-Image">
            <div className="Carousel-Title">
                <p>Perfect<br/>Style, Fit, Comfort</p>
            </div>
            <div className="Carousel-Button">
                <img src="assets/m.png" alt="shop"/>
            </div>
        <Carousel showArrows={true} showThumbs={false} autoPlay={true} interval={2000} showStatus={false} infiniteLoop={true}>
            <div>
                <img src="assets/2.jpeg" alt="Pic1" />
            </div>
            <div>
                <img src="assets/1.jpeg" alt="Pic2" />
            </div>
            <div>
                <img src="assets/4.jpeg"  alt="Pic3" />
            </div>
            <div>
                <img src="assets/3.jpeg" alt="Pic4" />
            </div>
            <div>
                <img src="assets/1.jpg" alt="Pic5"/>
            </div>
            <div>
                <img src="assets/2.jpeg"  alt="Pic6"/>
            </div>
        </Carousel>
        </div>
    );
  }
}

export default TitleImage;
