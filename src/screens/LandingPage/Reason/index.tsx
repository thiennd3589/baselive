import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import img1 from "assets/landing-page/reason/img1.png";
import img2 from "assets/landing-page/reason/img2.png";
import img3 from "assets/landing-page/reason/img3.png";
import decor1 from "assets/landing-page/reason/decor1.png";
import decor2 from "assets/landing-page/reason/decor2.png";
import decor3 from "assets/landing-page/reason/decor3.png";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const reasonItem = [
  {
    title: "K_6",
    detail: "K_7",
    icon: {
      name: "share alternate",
      //   color: "#069697",
      //   background: "#069697",
      className: "Icon1",
    },
    image: img1,
    decor: decor1,
  },
  {
    title: "K_8",
    detail: "K_9",
    icon: {
      name: "rss",
      //   color: "#EA3D2F",
      //   background: "#FEE4E2",
      className: "Icon2",
    },
    image: img2,
    decor: decor2,
  },
  {
    title: "K_10",
    detail: "K_11",
    icon: {
      name: "chart line",
      //   color: "#F3AA18",
      //   background: "#FCF3D7",
      className: "Icon3",
    },
    image: img3,
    decor: decor3,
  },
];

const Reason = () => {
  const { t } = useTranslation();
  return (
    <div className="Reason">
      <div className="Title">
        <h2 data-aos="fade-down">{t("K_5")}</h2>
      </div>
      {reasonItem.map((item, index) => (
        <div className="ReasonItem" key={index}>
          <div className="Info" data-aos="fade-left">
            <div className={`Icon ${item.icon.className}`}>
              <div className="IconContent">
                <Icon name={item.icon.name as SemanticICONS} />
              </div>
            </div>
            <div className="Content">
              <h2>{t(item.title)}</h2>
              <p>{t(item.detail)}</p>
            </div>
          </div>
          <div className="Images" data-aos="fade-right">
            <img src={item.image} alt={item.title} />
            <img
              src={item.decor}
              alt="decor"
              className={`ReasonDecor ${"Decor" + index}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reason;
