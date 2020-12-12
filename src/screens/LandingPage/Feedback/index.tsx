import React from "react";
import { Icon } from "semantic-ui-react";
import "./styles.scss";

const feedbacks = [
  {
    content:
      "To quickly start my startup landing page design, I was looking for a webinar. Baselive is one of the best online event platform I have come across. It’s so flexible, well organised and easily editable.",
    name: "Floyd Miles",
    position: "Vice President, GoPro",
  },
  {
    content:
      "I used webinar and created a online event for my startup within a week. Baselive is simple and highly intuitive, so anyone can use it.",
    name: "Pham Duong",
    position: "Moshub",
  },
  {
    content: "Baselive saved our time in online teaching in my company.",
    name: "Nguyen Duc Hai",
    position: "Co-Founder, XHunter",
  },
  {
    content: "Best way to hold a event. And better tool than Zoom",
    name: "Kristin Watson",
    position: "Co-Founder, BookMyShow",
  },
];

const Feedback = () => {
  return (
    <div className="Feedback">
      <Icon name="quote left" />
      <div className="Title">
        <h2 data-aos="fade-up" >
          Feedback from Real Customers
        </h2>
        <span data-aos="fade-down" >
          Get inspired by these stories.
        </span>
      </div>
      <div className="Content" data-aos="fade-right" >
        {feedbacks.map((feedback, index) => (
          <div className="Feed" key={index}>
            <Icon name="quote left" />
            <div className="Info">
              <div className="Text">{feedback.content}</div>
              <div>
                <div className="Name">{feedback.name}</div>
                <div className="Position">{feedback.position}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Feedback;
