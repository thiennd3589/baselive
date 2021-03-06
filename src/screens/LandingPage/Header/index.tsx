import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Global } from "global";
import Button from "elements/Button";
import { Icon, Menu } from "semantic-ui-react";
import LanguagePicker from "components/LanguagePicker";
import logo from "assets/Logo.png";
import "./styles.scss";

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
    <div
      className="HeaderLanding"
      data-aos="fade-down"
    >
      <div className={`Container ${props.disableLogo ? "DisabledLogo" : ""}`}>
        <div className="TopSection">
          {props.disableLogo ? null : (
            <div className="LogoSection">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          )}
          <div className="SocialLink">
            <LanguagePicker />
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
          <Button
            text="Create Account"
            onClick={() => {
              history.push("/signup");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
