import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "assets/Logo.svg";
import "./styles.scss";

export default () => {
  return (
    <div className="Header">
      <div className="Container">
        <div className="LogoSection">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="Menu">
          <Menu secondary> 
            <Menu.Item name="Become a host" as={Link} />
            <Menu.Item name="Help" as={Link} />
            <Menu.Item name="Sign up" as={Link} />
            <Menu.Item name="Log in" as={Link} />
          </Menu>
        </div>
      </div>
    </div>
  );
};
