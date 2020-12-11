import React from "react";
import baselive from "assets/landing-page/about/baselive.png";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="About">
      <div className="Title" data-aos="zoom-in" data-aos-offset={700}>
        {t("K_27")}
      </div>
      <div className="Content">
        <div className="Image" data-aos="fade-right" data-aos-offset={700}>
          <div className="Background"></div>
          <img src={baselive} alt="baselive" />
        </div>
        <div className="Info" data-aos="fade-left" data-aos-offset={700}>
          <div className="Vision">
            <h3>{t("K_28")}</h3>
            <ul>
              <li>{t("K_29")}</li>
              <li>{t("K_30")}</li>
            </ul>
          </div>
          <div className="Mission">
            <h3>{t("K_31")}</h3>
            <ul>
              <li>{t("K_32")}</li>
              <li>{t("K_33")}</li>
              <li>{t("K_34")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
