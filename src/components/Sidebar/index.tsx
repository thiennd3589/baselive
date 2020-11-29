import React from "react";
import logo from "assets/Logo.svg";
import { Menu } from "interfaces/common";
import { Icon } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";
import { State } from "redux-saga/reducers";

interface SidebarProps {
  menus: Menu[];
  eventName?: string;
  eventTime?: string;
  active?: string;
}

const Sidebar = (props: SidebarProps) => {
  const history = useHistory();
  const basicInfoLocal = useSelector((state: State) => state.basicInfoLocal);

  return (
    <div className="Sidebar">
      <div className="Brand" onClick={() => history.push("/")}>
        <img src={logo} alt="logo" />
        <span>Baselive</span>
      </div>
      <div className="Event">
        <div className="Name">{basicInfoLocal?.title}</div>
        <div className="Time">{basicInfoLocal?.eventStart}</div>
      </div>
      <div className="Menu">
        <div className="Title">Finish your info</div>
        {props.menus.map((item, index) => (
          <Link
            className={`MenuItem ${
              props.active === item.route ? "Active" : ""
            }`}
            to={item.route as string}
            key={index}
          >
            <Icon name={item.icon} />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
