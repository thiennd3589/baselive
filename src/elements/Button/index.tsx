import React from "react";
import "./styles.scss";

interface ButtonProps {
  text?: string;
  className?: string;

  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`Button ${props.className}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
