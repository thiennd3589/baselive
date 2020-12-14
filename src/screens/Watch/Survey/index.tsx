import React from "react";
import "./styles.scss";

const Survey = () => {
  return (
    <div className="Survey">
      <div className="Content">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSexdFTS7AP5RpfXvqPBFvATTfaTQ5F-JvZlAI9MAajOZubHVw/viewform?embedded=true"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          height="50vh"
        >
          Đang tải…
        </iframe>
      </div>
    </div>
  );
};

export default Survey;
