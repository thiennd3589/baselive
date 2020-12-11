import React, { useState } from "react";
import icon1 from "assets/landing-page/features/icon1.png";
import icon2 from "assets/landing-page/features/icon2.png";
import icon3 from "assets/landing-page/features/icon3.png";
import icon4 from "assets/landing-page/features/icon4.png";
import mac1 from "assets/landing-page/features/mac1.png";
import mac2 from "assets/landing-page/features/mac2.png";
import mac3 from "assets/landing-page/features/mac3.png";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const features = [
  {
    text: "K_35",
    icon: icon1,
  },
  {
    text: "K_36",
    icon: icon2,
  },
  {
    text: "K_37",
    icon: icon3,
  },
  {
    text: "K_38",
    icon: icon4,
  },
];

const featureDetail = [
  {
    img: mac1,
    title: "K_39",
    detail: "K_40",
  },
  {
    img: mac2,
    title: "K_41",
    detail: "K_42",
  },
  {
    img: mac3,
    title: "K_43",
    detail: "K_44",
  },
  {
    img: mac3,
    title: "K_45",
    detail: "K_46",
  },
];

const Features = () => {
  const { t } = useTranslation();
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
          <h3>{t(title)}</h3>
          <p>{t(detail)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="Features">
      <div className="Decor"></div>
      <div className="Title">
        <h2 data-aos="fade-down" data-aos-offset={700}>
          {t("K_56")}
        </h2>
        <p data-aos="fade-up" data-aos-offset={700}>
          {t("K_57")}
        </p>
      </div>
      <div
        className="Content"
        data-aos="fade-left"
        data-aos-delay={500}
      >
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
              <p>{t(feature.text)}</p>
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
