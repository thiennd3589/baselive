import React from "react";
import baselive from "assets/landing-page/about/baselive.png";
import "./styles.scss";

const About = () => {
  return (
    <div className="About">
      <div className="Title">About us</div>
      <div className="Content">
        <div className="Image">
          <div className="Background"></div>
          <img src={baselive} alt="baselive" />
        </div>
        <div className="Info">
          <div className="Vision">
            <h3>Vision</h3>
            <ul>
              <li>The all-in-one event platform optimized for connecting</li>
              <li>Unicorn StartUp of VietNam</li>
            </ul>
          </div>
          <div className="Mission">
            <h3>Mission</h3>
            <ul>
              <li>Share knowlegde </li>
              <li>Convey experiences</li>
              <li>More interactive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
