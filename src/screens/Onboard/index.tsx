import EventCategory from "components/EventCategory";
import EventPicker from "components/EventPicker";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import "./styles.scss";

const Onboard = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default Onboard;
