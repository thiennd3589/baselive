import Button from "elements/Button";
import TextBox from "elements/TextBox";
import React from "react";
import "./styles.scss";

const QaA = () => {
  return (
    <div className="QaA">
      <div>
        <TextBox />
      </div>
      <div className="Submit">
        <TextBox placeholder="Type Answer" />
        <Button text="Submit" />
      </div>
    </div>
  );
};

export default QaA;
