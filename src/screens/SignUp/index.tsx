import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextBox from "elements/TextBox";
import Button from "elements/Button";
import Header from "components/Header";
import { signUp } from "./actions";
import { State } from "redux-saga/reducers";
import "./styles.scss";

interface SignUpState {
  fullname: { value: string; errorMessage: string; showError: boolean };
  email: { value: string; errorMessage: string; showError: boolean };
  password: { value: string; errorMessage: string; showError: boolean };
  enableRedirect: boolean;
}

interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const signUpResult = useSelector((state: State) => state.signUp);
  const [state, setState] = useState<SignUpState>({
    fullname: {
      value: "",
      errorMessage: "",
      showError: false,
    },
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
    if (signUpResult) {
      if (signUpResult.success) {
        if (state.enableRedirect) {
          setState((prev) => ({ ...prev, enableRedirect: false }));
          history.push("/onboard");
        }
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
  }, [signUpResult]);

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

  const onSignUp = () => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (re.test(state.email.value) !== true) {
      setState((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          errorMessage: "Your email is invalid",
          showError: true,
        },
      }));
      return;
    }
    if (state.password.value.length < 6) {
      setState((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          errorMessage: "Your password length must be greater than 6",
          showError: true,
        },
      }));
      return;
    }
    dispatch(
      signUp({
        fullname: state.fullname.value,
        email: state.email.value,
        password: state.password.value,
      })
    );
    setState((prev) => ({ ...prev, enableRedirect: true }));
  };

  return (
    <>
      <Header />
      <div className="SignUp">
        <div className="Title">B Live</div>
        <div className="LoginForm">
          <TextBox
            placeholder="Type your name here"
            errorMessage={state.fullname.errorMessage}
            onChange={onChange}
            name="fullname"
            showError={state.fullname.showError}
            value={state.fullname.value}
          />
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
            <Button
              className="SignUpButton"
              onClick={onSignUp}
              text="Sign up"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
