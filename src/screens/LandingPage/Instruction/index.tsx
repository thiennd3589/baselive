import React from "react";
import { useTranslation } from "react-i18next";
import { Icon, SemanticICONS } from "semantic-ui-react";
import "./styles.scss";

const usages = [
  {
    icon: "lightning",
    title: "K_12",
    detail: "K_13",
  },
  {
    icon: "home",
    title: "K_14",
    detail: "K_15",
  },
  {
    icon: "video camera",
    title: "K_16",
    detail: "K_17",
  },
  {
    icon: "arrows alternate horizontal",
    title: "K_18",
    detail: "K_19",
  },
  {
    icon: "discourse",
    title: "K_20",
    detail: "K_21",
  },
  {
    icon: "keyboard",
    title: "K_22",
    detail: "K_23",
  },
];

const Instruction = () => {
  const { t } = useTranslation();
  return (
    <div className="Instruction">
      <div className="Title">
        <h2 data-aos="zoom-in">{t("K_24")}</h2>
        <p data-aos="zoom-out">{t("K_25")}</p>
      </div>
      <div className="Usages">
        {usages.map((item, index) => (
          <div
            className="UsageItem"
            key={index}
            data-aos="fade-down"
          >
            <div className="Icon">
              <div className="IconContent">
                <Icon name={item.icon as SemanticICONS} />
              </div>
            </div>
            <div className="Content">
              <h3>{t(item.title)}</h3>
              <p>{t(item.detail)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instruction;
