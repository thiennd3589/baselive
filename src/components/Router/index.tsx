import React from "react";
import { Switch, Route } from "react-router-dom";
import { Global } from "global";
import BasicInfo from "screens/BasicInfor";
import Login from "screens/Login";
import Onboard from "screens/Onboard";
import Detail from "screens/Detail";
import BasicInfoMin from "screens/BasicInfoMin";
import Ticket from "screens/Ticket";
import Publish from "screens/Publish";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Onboard} />
      <Route path="/login" component={Login} />
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
    </Switch>
  );
};

export default Router;
