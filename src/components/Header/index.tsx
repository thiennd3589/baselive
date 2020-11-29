import React, {useState} from "react";
import {Menu} from "semantic-ui-react";
import {Link, useHistory, useLocation} from "react-router-dom";
import logo from "assets/Logo.svg";
import "./styles.scss";
import {Global} from "../../global";

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
        history.push('/');
        redraw({});
    }

    return (
        <div className="Header">
            <div className={`Container ${props.disableLogo ? "DisabledLogo" : ""}`}>
                {props.disableLogo ? null : (
                    <div className="LogoSection">
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                        </Link>
                    </div>
                )}
                <div className="Menu">
                    <Menu secondary>
                        <Menu.Item name="Create Event" as={Link} to="/createEvent"/>
                        <Menu.Item name="Help" as={Link} to="/"/>
                        {!Global.user.token ? <><Menu.Item
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
                            /></> :
                        <Menu.Item name="Logout" onClick={onLogout}/>
                        }
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Header;
