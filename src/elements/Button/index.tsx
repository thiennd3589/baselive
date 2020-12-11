import React from "react";
import "./styles.scss";

interface ButtonProps {
  text?: string;
  className?: string;
  [key: string]: any;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`Button ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
