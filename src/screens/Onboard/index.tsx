import EventCategory from "components/EventCategory";
import EventPicker from "components/EventPicker";
import React from "react";
import "./styles.scss";

const Onboard = () => {
  return (
    <div className="Onboard">
      <div className="Title">
        <h1 className="Text">
          <p>Baselive</p>
          <p>A unique virual online video streaming platform </p>
        </h1>
        <EventPicker />
      </div>
      <div className="Content">
        <EventCategory />
      </div>
    </div>
  );
};

export default Onboard;
