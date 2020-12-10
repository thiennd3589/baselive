import React, { useState } from "react";
import icon1 from "assets/landing-page/features/icon1.png";
import icon2 from "assets/landing-page/features/icon2.png";
import icon3 from "assets/landing-page/features/icon3.png";
import icon4 from "assets/landing-page/features/icon4.png";
import mac1 from "assets/landing-page/features/mac1.png";
import mac2 from "assets/landing-page/features/mac2.png";
import mac3 from "assets/landing-page/features/mac3.png";
import "./styles.scss";

const features = [
  {
    text: "Actionable analytics and reporting",
    icon: icon1,
  },
  {
    text: "Automation marketing integrated",
    icon: icon2,
  },
  {
    text: "Powerful call to action",
    icon: icon3,
  },
  {
    text: "Power up engagement and connection",
    icon: icon4,
  },
];

const featureDetail = [
  {
    img: mac1,
    title: "ACTIONABLE ANALYTICS AND REPORTING",
    detail:
      "With Baselive's powerful intelligence engine you can understand performance, track individual account engagement data and indentify lead that are ready next step for the next step",
  },
  {
    img: mac2,
    title: "Automation marketing integrated",
    detail:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor nisi est nihil blanditiis provident ullam explicabo, dicta doloribus vel tempore quas voluptas veniam optio! Optio sapiente ratione commodi dolor. Repudiandae?",
  },
  {
    img: mac3,
    title: "Powerful call to action",
    detail:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor nisi est nihil blanditiis provident ullam explicabo, dicta doloribus vel tempore quas voluptas veniam optio! Optio sapiente ratione commodi dolor. Repudiandae?",
  },
  {
    img: mac3,
    title: "Power up engagement and connection",
    detail:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor nisi est nihil blanditiis provident ullam explicabo, dicta doloribus vel tempore quas voluptas veniam optio! Optio sapiente ratione commodi dolor. Repudiandae?",
  },
];

const Features = () => {
  const [featureIndex, setFeatureIndex] = useState(0);

  const onClick = (index: number) => {
    setFeatureIndex(index);
  };

  const renderDetail = (index: number) => {
    const { img, title, detail } = featureDetail[index];
    return (
      <div className="FeatureDetail">
        <div className="Image">
          <img src={img} alt="detail" />
        </div>
        <div className="Info">
          <h3>{title}</h3>
          <p>{detail}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="Features">
      <div className="Title">
        <h2>Discover the key features</h2>
        <p>Robust Backend Tools That Support Every Program Need</p>
      </div>
      <div className="Content">
        <div className="FeatureContainer">
          {features.map((feature, index) => (
            <div
              onClick={() => {
                onClick(index);
              }}
              className={`FeatureButton ${
                index === featureIndex ? "Active" : ""
              }`}
              key={index}
            >
              <p>{feature.text}</p>
              <div className="Image">
                <img src={feature.icon} alt="icon" />
              </div>
            </div>
          ))}
        </div>
        {renderDetail(featureIndex)}
      </div>
    </div>
  );
};

export default Features;
