import React from "react";
import member from "assets/landing-page/member/member.jpg";
import "./styles.scss";

const Member = () => {
  return (
    <div className="Member" data-aos="fade-down" >
      <div className="Title">About us</div>
      <img src={member} alt="member" />
    </div>
  );
};

export default Member;
