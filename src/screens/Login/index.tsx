import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global } from "global";
import TextBox from "elements/TextBox";
import { logIn } from "./actions";
import { State } from "redux-saga/reducers";
import { Obj } from "interfaces/common";
import google from "assets/social_network/google.svg";
import facebook from "assets/social_network/facebook.svg";
import "./styles.scss";
import Button from "elements/Button";
import Header from "components/Header";

interface LoginState {
  email: { value: string; errorMessage: string; showError: boolean };
  password: { value: string; errorMessage: string; showError: boolean };
  enableRedirect: boolean;
}

interface LoginProps {
  redirect?: string;
}

const Login = (props: LoginProps) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const loginResult = useSelector((state: State) => state.logIn);
  const [state, setState] = useState<LoginState>({
    email: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    password: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    enableRedirect: false,
  });

  useEffect(() => {
    if (loginResult) {
      if (loginResult.success) {
        //Save Token
        const loginResponse = loginResult.response as Obj;
        const token = ((loginResponse.headers as Obj)
          .authorization as string).slice(7);
        Global.user.token = token;
        Global.isAuthenticated = true;

        localStorage.setItem("accessToken", token);
        //Redirect;
        props.redirect ? history.push(props.redirect) : history.push("/");
        return;
      } else {
        setState((prevState) => ({
          ...prevState,
          email: {
            ...prevState.email,
            errorMessage: "Your email may be incorrect",
            showError: true,
          },
          password: {
            ...prevState.password,
            errorMessage: "Your password may be incorrect",
            showError: true,
          },
        }));
      }
    }
  }, [loginResult]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        showError: false,
        errorMessage: "",
      },
    }));
  };

  const onLogin = () => {
    dispatch(
      logIn({ email: state.email.value, password: state.password.value })
    );
  };

  const onSignUp = () => {
    history.push("/signup");
  };

  return (
    <>
      <Header />
      <div className="Login">
        <div className="Title">B Live</div>
        <div className="LoginForm">
          <TextBox
            placeholder="Type your account here"
            errorMessage={state.email.errorMessage}
            onChange={onChange}
            name="email"
            showError={state.email.showError}
            value={state.email.value}
          />
          <TextBox
            placeholder="Type your password here"
            errorMessage={state.password.errorMessage}
            showError={state.password.showError}
            name="password"
            type="password"
            onChange={onChange}
            value={state.password.value}
          />
          <div className="SubmitSection">
            <Button className="LoginButton" onClick={onLogin} text="Log in" />
            <Button
              className="SignUpButton"
              onClick={onSignUp}
              text="Sign up"
            />
          </div>
          <span>Or</span>
          <div className="SocialLogin">
            <button className="GoogleLogin">
              <img src={google} alt="google" />
              <span>Continue with Google</span>
            </button>
            <button className="FacebookLogin">
              <img src={facebook} alt="facebook" />
              <span>Continue with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
