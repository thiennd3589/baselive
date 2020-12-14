import React from "react";
import banner from "assets/watch/banner.jpg";
import "./styles.scss";

const AdsBanner = () => {
  return (
    <div className="AdsBanner">
      <img src={banner} alt="banner" />
    </div>
  );
};

export default AdsBanner;
