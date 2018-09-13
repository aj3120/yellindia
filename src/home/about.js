import React, { Component } from 'react';
import './home.css';

class About extends Component {
  render() {
    return (
      <div className="About">
          <div className="About-Title">
            About Yell India
          </div>
          <div className="About-Content">
            <div className="About-Image">
              <img src="assets/about.png" alt="about"/>
            </div>
            <div className="About-Description">
              <div className="short-desc">Our mission is threefold - to foster designer-artisan collaborations,
                inspire consumers to value provenance and process, and pioneer industry change and sustainability
                for rural textile communities.
               </div >
               <div className="days-created" > 
                  ARTISAN EMPLOYMENT DAYS CREATED
               </div>
               <div className="days">
                 123456
              </div>  
              <div className="countries">
              COUNTRIES INVOLVED TO DATE
              </div>
              <div className="countries-list">
                India<br/>
                China<br/>
                Sri Lanka<br/>
              </div>
              <div className="mattertribe">
                #MATTERTRIBE
              </div>
              <div className="mattertribe-list">
                12 Designers<br/>12 Factories
              </div>
            </div>
          </div>
          
      </div>
    );
  }
}

export default About;