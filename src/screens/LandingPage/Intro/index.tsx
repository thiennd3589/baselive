import React from "react";
import { useTranslation } from "react-i18next";
import Button from "elements/Button";
import bg from "assets/landing-page/intro/bg.png";
import img1 from "assets/landing-page/intro/img1.png";
import img2 from "assets/landing-page/intro/img2.png";
import img3 from "assets/landing-page/intro/img3.png";
import img4 from "assets/landing-page/intro/img4.png";
import img5 from "assets/landing-page/intro/img5.png";
import sample from "assets/landing-page/intro/sample.png";
import "./styles.scss";

const IntroLanding = () => {
  const { t } = useTranslation();
  return (
    <div className="IntroLanding">
      <div className="Title">
        <h1 data-aos="fade-down" data-aos-delay={200}>
          {t("K_1")}
        </h1>
        <p data-aos="fade-up" data-aos-delay={200}>
          {t("K_2")}
        </p>
      </div>
      <div className="Buttons">
        <Button
          text={t("K_3")}
          className="DownloadButton"
          data-aos="fade-right"
          data-aos-delay={500}
        />
        <Button
          text={t("K_4")}
          className="FreeTrialButton"
          data-aos="fade-left"
          data-aos-delay={500}
        />
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
