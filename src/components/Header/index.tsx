import React, { useState } from "react";
import { Icon, Menu, Popup } from "semantic-ui-react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "assets/Logo.svg";
import "./styles.scss";
import { Global } from "../../global";

interface HeaderProps {
  disableLogo?: boolean;
}

const Header = (props: HeaderProps) => {
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
    <div className="Header">
      <div className={`Container ${props.disableLogo ? "DisabledLogo" : ""}`}>
        {props.disableLogo ? null : (
          <div className="LogoSection">
            <Link to="/">
              <img src={logo} alt="logo" />
              <span>B Live</span>
            </Link>
          </div>
        )}
        <div className="Menu">
          <Menu secondary>
            <Menu.Item name="Create Event" as={Link} to="/createEvent" />
            <Menu.Item name="Help" as={Link} to="/" />
            {!Global.user.token ? (
              <>
                <Menu.Item
                  name="Sign up"
                  as={Link}
                  to="/signup"
                  active={location.pathname === "/signup"}
                />
                <Menu.Item
                  name="Log in"
                  as={Link}
                  to="/login"
                  active={location.pathname === "/login"}
                />
              </>
            ) : (
              <Menu.Item>
                <Popup trigger={<Icon name="user" />} on="click">
                  <Popup.Header>Account</Popup.Header>
                  <Popup.Content className="AccountManage">
                    <div onClick={onLogout}>Log Out</div>
                    <div
                      onClick={() => {
                        history.push("/eventManage");
                      }}
                    >
                      Manage Event
                    </div>
                  </Popup.Content>
                </Popup>
              </Menu.Item>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
