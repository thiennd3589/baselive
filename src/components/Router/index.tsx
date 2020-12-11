import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Global } from "global";
import BasicInfo from "screens/BasicInfor";
import Onboard from "screens/Onboard";
import Detail from "screens/Detail";
import BasicInfoMin from "screens/BasicInfoMin";
import Ticket from "screens/Ticket";
import Publish from "screens/Publish";
import EventPage from "screens/EventPage";
import SignUp from "screens/SignUp";
import { useDispatch } from "react-redux";
import { queryCategory } from "redux-saga/global-actions";
import Loader from "components/Loader";

const Login = React.lazy(
  () => import(/* webpackChunkName: "Login" */ "screens/Login")
);
const LandingPage = React.lazy(
  () => import(/* webpackChunkName: "Login" */ "screens/LandingPage")
);

const Router = () => {
  const [, redraw] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      queryCategory({ type: "category", referTableId: "", referTableName: "" })
    );
    Global.user.token = localStorage.getItem("accessToken");
    Global.isAuthenticated = Global.user.token ? true : false;
    redraw({});
  }, []);

  return (
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<Loader />}>
          <LandingPage />
        </Suspense>
      </Route>
      <Route path="/onboard" component={Onboard} />
      <Route path="/login">
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      </Route>
      <Route path="/signup" component={SignUp} />
      <Route
        path="/createEvent"
        render={() => {
          if (Global.isAuthenticated) {
            return <BasicInfo />;
          } else {
            return <Login redirect={"/createEvent"} />;
            // return <Login redirect="/createEvent" />;
          }
        }}
      />
      <Route
        path="/eventDetail"
        render={() => {
          if (Global.isAuthenticated) {
            return <Detail />;
          } else {
            return <Detail />;
            // return <Login redirect="/createEvent" />;
          }
        }}
      />
      <Route
        path="/basicInfo"
        render={() => {
          if (Global.isAuthenticated) {
            return <BasicInfoMin />;
          } else {
            return <Login />;
            // return <Login redirect="/createEvent" />;
          }
        }}
      />
      <Route
        path="/ticket"
        render={() => {
          if (Global.isAuthenticated) {
            return <Ticket />;
          } else {
            return <Login />;
            // return <Login redirect="/createEvent" />;
          }
        }}
      />
      <Route
        path="/publish"
        render={() => {
          if (Global.isAuthenticated) {
            return <Publish />;
          } else {
            return <Login />;
            // return <Login redirect="/createEvent" />;
          }
        }}
      />
      <Route path="/event/:id" component={EventPage} />
    </Switch>
  );
};

export default Router;
