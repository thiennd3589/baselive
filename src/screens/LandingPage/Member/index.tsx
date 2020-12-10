import React from "react";
import member from "assets/landing-page/member/member.jpg";

const Member = () => {
  return (
    <div className="Member">
      <img
        src={member}
        alt="member"
        style={{
          width: `${window.innerWidth <= 1442 ? window.innerWidth : 1442}px`,
        }}
      />
    </div>
  );
};

export default Member;
