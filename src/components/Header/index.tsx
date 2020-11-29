import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import logo from "assets/Logo.svg";
import "./styles.scss";

interface HeaderProps {
  disableLogo?: boolean;
}

const Header = (props: HeaderProps) => {
  const location = useLocation();

  return (
    <div className="Header">
      <div className={`Container ${props.disableLogo ? "DisabledLogo" : ""}`}>
        {props.disableLogo ? null : (
          <div className="LogoSection">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        )}
        <div className="Menu">
          <Menu secondary>
            <Menu.Item name="Become a host" as={Link} to="/createEvent" />
            <Menu.Item name="Help" as={Link} to="/" />
            <Menu.Item
              name="Sign up"
              as={Link}
              to="/login"
              active={location.pathname === "/signup"}
            />
            <Menu.Item
              name="Log in"
              as={Link}
              to="/login"
              active={location.pathname === "/login"}
            />
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
