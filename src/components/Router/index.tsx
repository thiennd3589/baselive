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
import { useDispatch, useSelector } from "react-redux";
import { queryCategory } from "redux-saga/global-actions";
import Loader from "components/Loader";
import Watch from "screens/Watch";
import Login from "screens/Login";
import EventManage from "screens/EventManage";
import StageSetting from "screens/StageSetting";
import { State } from "redux-saga/reducers";

const LandingPage = React.lazy(
  () => import(/* webpackChunkName: "Login" */ "screens/LandingPage")
);

const Router = () => {
  const [, redraw] = useState({});
  const dispatch = useDispatch();
  const localEventInfo = useSelector((state: State) => state.basicInfoLocal);
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
      <Route path="/onboard" component={LandingPage} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup" component={SignUp} />
      <Route
        path="/createEvent"
        render={() => {
          if (Global.isAuthenticated) {
            return <BasicInfo />;
          } else {
            return <Login redirect={"/LandingPage"} />;
          }
        }}
      />
      <Route
        path="/eventDetail"
        render={() => {
          if (Global.isAuthenticated) {
            return localEventInfo ? <Detail /> : <Loader />;
          } else {
            return <Login redirect="/LandingPage" />;
            // return <Login redirect="/createEvent" />;
          }
        }}
      />
      <Route
        path="/basicInfo"
        render={() => {
          if (Global.isAuthenticated) {
            return localEventInfo ? <LandingPage /> : <Loader />;
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
            return localEventInfo ? <LandingPage /> : <Loader />;
          } else {
            return <Login />;
          }
        }}
      />
      <Route
        path="/publish"
        render={() => {
          if (Global.isAuthenticated) {
            return localEventInfo ? <LandingPage /> : <Loader />;
          } else {
            return <Login />;
            // return <Login redirect="/createEvent" />;
          }
        }}
      />
      <Route path="/event/:id" component={LandingPage} />
      <Route path="/watch/:id" component={LandingPage} />
      <Route
        path="/eventManage"
        render={() => {
          if (Global.isAuthenticated) {
            return <LandingPage />;
          } else {
            return <Login redirect="/eventManage" />;
          }
        }}
      />
      <Route path="/stage" component={LandingPage} />
    </Switch>
  );
};

export default Router;
