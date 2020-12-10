import Button from "elements/Button";
import React from "react";
import bg from "assets/landing-page/intro/bg.png";
import sample from "assets/landing-page/intro/sample.png";
import img1 from "assets/landing-page/intro/img1.png";
import img2 from "assets/landing-page/intro/img2.png";
import img3 from "assets/landing-page/intro/img3.png";
import img4 from "assets/landing-page/intro/img4.png";
import img5 from "assets/landing-page/intro/img5.png";
import "./styles.scss";

const IntroLanding = () => {
  return (
    <div className="IntroLanding">
      <div className="Title">
        <h1>A unique virtual video streaming platform</h1>
        <p>
          Baselive is an online event platform where you can create engaging
          virtual events that connect people around the world
        </p>
      </div>
      <div className="Buttons">
        <Button text="Download" className="DownloadButton" />
        <Button text="Free trial" className="FreeTrialButton" />
      </div>
      <div className="Images">
        <div className="Background">
          <img src={bg} alt="bg" />
        </div>
        <div className="Sample">
          <img src={sample} alt="sample" />
        </div>
        <img src={img1} alt="sample" className="Decor Image1" />
        <img src={img2} alt="sample" className="Decor Image2" />
        <img src={img3} alt="sample" className="Decor Image3" />
        <img src={img4} alt="sample" className="Decor Image4" />
        <img src={img5} alt="sample" className="Decor Image5" />
      </div>
    </div>
  );
};

export default IntroLanding;
