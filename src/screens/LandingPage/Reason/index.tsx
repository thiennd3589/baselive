import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import img1 from "assets/landing-page/reason/img1.png";
import img2 from "assets/landing-page/reason/img2.png";
import img3 from "assets/landing-page/reason/img3.png";
import decor1 from "assets/landing-page/reason/decor1.png";
import decor2 from "assets/landing-page/reason/decor2.png";
import decor3 from "assets/landing-page/reason/decor3.png";
import "./styles.scss";

const reasonItem = [
  {
    title: "First all-in-one event platform optimized for connecting",
    detail:
      "Organizers can achieve the same goals of their offline events by customizing their Baselive events to fit the requirements, whether it's a 50-person recruiting event, a 500-person all-hands meeting, or a 50,000-person annual conference. Hopin is built knowing every event is unique.",
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
    title: "Host your most interactive online event yet",
    detail:
      "Baselive is a virtual venue with multiple interactive areas that are optimized for connecting and engaging. Attendees can move in and out of rooms just like an in-person event and enjoy the content and connections you've created for them. ",
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
    title: "Turn audience engagement into actionable data",
    detail:
      "Patented back-end analytics capture audience engagement data to enable marketers with actionable insights and digestible profiles of buyer interest. Seamlessly integrate that intent to CRM or Baselive's Marketing Automation so you can inform sales, impact nurture and optimize program efficiency.",
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
  return (
    <div className="Reason">
      <div className="Title">
        <h2>Why Baselive?</h2>
      </div>
      {reasonItem.map((item, index) => (
        <div className="ReasonItem" key={index}>
          <div className="Info">
            <div className={`Icon ${item.icon.className}`}>
              <div className="IconContent">
                <Icon name={item.icon.name as SemanticICONS} />
              </div>
            </div>

            <div className="Content">
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </div>
          </div>
          <div className="Images">
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
