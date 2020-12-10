import React from "react";
import About from "./About";
import Approach from "./Approach";
import Discover from "./Discover";
import Features from "./Features";
import Feedback from "./Feedback";
import Header from "./Header";
import Instruction from "./Instruction";
import IntroLanding from "./Intro";
import Member from "./Member";
import Reason from "./Reason";
import "./styles.scss";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div className="Container">
        <Header />
        <IntroLanding />
        <Reason />
        <Instruction />
        <Discover />
        <About />
        <Features />
        <Approach />
        <Feedback />
        <Member />
      </div>
    </div>
  );
};

export default LandingPage;
