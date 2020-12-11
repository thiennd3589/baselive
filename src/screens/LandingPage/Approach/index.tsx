import React from "react";
import icon1 from "assets/landing-page/features/icon1.png";
import icon2 from "assets/landing-page/features/icon2.png";
import icon3 from "assets/landing-page/features/icon3.png";
import icon4 from "assets/landing-page/features/icon4.png";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const goals = [
  {
    name: "K_47",
    year: "2020",
    detail: "K_48",
    icon: icon4,
  },
  {
    name: "K_49",
    year: "2021",
    detail: "K_50",
    icon: icon2,
  },
  {
    name: "K_51",
    year: "2022",
    detail: "K_52",
    icon: icon3,
  },
  {
    name: "K_53",
    year: "2023",
    detail: "K_54",
    icon: icon1,
  },
];

const Approach = () => {
  const { t } = useTranslation();
  return (
    <div className="Approach">
      <div className="Title" data-aos="zoom-out" data-aos-offset={700}>
        <h2>{t("K_55")}</h2>
      </div>
      <div className="Content" data-aos="zoom-in" data-aos-offset={700}>
        {goals.map((goal, index) => (
          <div className="Goal" key={index}>
            <div className="Icon">
              <div className="Image">
                <img src={goal.icon} alt={goal.name} />
              </div>
            </div>
            <div className="Info">
              <h3>{t(goal.name)}</h3>
              <h3>{goal.year}</h3>
              <p>{t(goal.detail)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approach;
