import React, { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "assets/Logo.svg";
import "./styles.scss";
import { Global } from "global";
import Button from "elements/Button";

interface HeaderProps {
  disableLogo?: boolean;
}

const LandingHeader = (props: HeaderProps) => {
  const location = useLocation();
  const history = useHistory();
  const [, redraw] = useState({});

  const onLogout = () => {
    localStorage.clear();
    Global.user.token = null;
    Global.isAuthenticated = false;
    history.push("/");
    redraw({});
  };

  return (
    <div className="HeaderLanding">
      <div className={`Container ${props.disableLogo ? "DisabledLogo" : ""}`}>
        <div className="TopSection">
          {props.disableLogo ? null : (
            <div className="LogoSection">
              <Link to="/">
                <img src={logo} alt="logo" />
                <span>Baselive</span>
              </Link>
            </div>
          )}
          <div className="SocialLink">
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

        <div className="BottomSection">
          <div className="Menu">
            <Menu secondary>
              <Menu.Item name="About the Service" as={Link} to="/createEvent" />
              <Menu.Item name="Company" as={Link} to="/" />
              <Menu.Item name="Explore event" as={Link} to="/onboard" />
              <Menu.Item name="Blog" as={Link} to="/" />
              {!Global.user.token ? (
                <>
                  <Menu.Item
                    name="Log in"
                    as={Link}
                    to="/login"
                    active={location.pathname === "/login"}
                  />
                </>
              ) : (
                <Menu.Item name="Log out" onClick={onLogout} />
              )}
            </Menu>
          </div>
          <Button text="Create Account" />
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
