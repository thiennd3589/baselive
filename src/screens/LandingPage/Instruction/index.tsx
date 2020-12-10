import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import "./styles.scss";

const usages = [
  {
    icon: "lightning",
    title: "Workshop",
    detail:
      "Teach a lesson and breakout into groups. Come back together for another lesson, followed by one-on-one meetings.",
  },
  {
    icon: "home",
    title: "Conference",
    detail:
      "Host a full scale conference with multi session, full stage, networking.",
  },
  {
    icon: "video camera",
    title: "Webinar",
    detail:
      "Webinar tend to be one sided. Audience are passively listener. Baselive powers up their engagement.",
  },
  {
    icon: "arrows alternate horizontal",
    title: "Hybirds event",
    detail:
      "Host a physical event, then stream it into Baselive with interactive segment to your audience",
  },
  {
    icon: "discourse",
    title: "Course",
    detail:
      "Event on Baselive for education with full feature for gaining experience and connecting.",
  },
  {
    icon: "keyboard",
    title: "Fair show",
    detail:
      "Build a virtual expo in Baselive that has a floor of interactive vendor booths with customizable buttons.",
  },
];

const Instruction = () => {
  return (
    <div className="Instruction">
      <div className="Title">
        <h2>Way to use Baselive</h2>
        <p>
          Create events with unlimited possibilities, and craft your event
          schedule for a uniquely great experience every time.
        </p>
      </div>
      <div className="Usages">
        {usages.map((item, index) => (
          <div className="UsageItem" key={index}>
            <div className="Icon">
              <div className="IconContent">
                <Icon name={item.icon as SemanticICONS} />
              </div>
            </div>
            <div className="Content">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instruction;
