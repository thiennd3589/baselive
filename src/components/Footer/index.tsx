import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import logo from "../../assets/no-color-logo.svg";
import "./styles.scss";

const information = [
  {
    title: "Baselive",
    info: [
      { text: "About us", to: "/" },
      { text: "Careers", to: "/" },
      { text: "Our vision", to: "/" },
      { text: "Policies", to: "/" },
      { text: "Help", to: "/" },
      { text: "Diversity & Belonging", to: "/" },
    ],
  },
  {
    title: "Discover",
    info: [
      { text: "Trust & Safety", to: "/" },
      { text: "Travel Credit", to: "/" },
      { text: "Gift Cards", to: "/" },
      { text: "Community", to: "/" },
      { text: "Business Travel", to: "/" },
      { text: "Guidebooks", to: "/" },
      { text: "Magazine", to: "/" },
    ],
  },
  {
    title: "Hosting",
    info: [
      { text: "Why Host", to: "/" },
      { text: "Hospitality", to: "/" },
      { text: "Responsible Hosting", to: "/" },
      { text: "Commnunity Center", to: "/" },
    ],
  },
];

const Information = (props: {
  info: { text: string; to: string }[];
  title: string;
}) => {
  return (
    <div className="Information">
      <h3>{props.title}</h3>
      <div className="Item">
        {props.info.map((item, index) => (
          <Link to={item.to} key={index}>
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Content">
        {information.map((info, index) => (
          <Information title={info.title} info={info.info} key={index} />
        ))}
      </div>
      <div className="Copyright">
        <div className="Logo">
          <img src={logo} alt="logo" />
          <Icon name="copyright outline" />
          <span>Baselive</span>
        </div>
        <div className="Contact">
          <Link to="/">Terms</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Site map</Link>
          <Link to="/">
            <Icon name="facebook f" />
          </Link>
          <Link to="/">
            <Icon name="twitter" />
          </Link>
          <Link to="/">
            <Icon name="instagram" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
