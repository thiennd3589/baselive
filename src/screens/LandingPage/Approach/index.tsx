import React from "react";
import icon1 from "assets/landing-page/features/icon1.png";
import icon2 from "assets/landing-page/features/icon2.png";
import icon3 from "assets/landing-page/features/icon3.png";
import icon4 from "assets/landing-page/features/icon4.png";
import "./styles.scss";

const goals = [
  {
    name: "Ideate - co founder",
    year: "2020",
    detail: "Turn your idea from concept to MVP. Finding co founder. ",
    icon: icon4,
  },
  {
    name: "Webinar all in one",
    year: "2021",
    detail:
      "Develop all function to support all kind of online streaming event such as webinar, conference, workshop, course and so on. ",
    icon: icon2,
  },
  {
    name: "System architecture",
    year: "2022",
    detail:
      "Expand system architecture and back end by developing server to scale up beyond VietNam",
    icon: icon3,
  },
  {
    name: "Automation marketing",
    year: "2023",
    detail: "Integrate sms, email, automation marketing system. ",
    icon: icon1,
  },
];

const Approach = () => {
  return (
    <div className="Approach">
      <div className="Title">
        <h2>Our approach to reach our business goals</h2>
      </div>
      <div className="Content">
        {goals.map((goal, index) => (
          <div className="Goal" key={index}>
            <div className="Icon">
              <div className="Image">
                <img src={goal.icon} alt={goal.name} />
              </div>
            </div>
            <div className="Info">
              <h3>{goal.name}</h3>
              <h3>{goal.year}</h3>
              <p>{goal.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approach;
