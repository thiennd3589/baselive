import React from "react";
import { Switch, Route } from "react-router-dom";
import { Global } from "global";
import BasicInfo from "screens/BasicInfor";
import Login from "screens/Login";
import Onboard from "screens/Onboard";

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
            return <Login redirect="/createEvent" />;
          }
        }}
      />
    </Switch>
  );
};

export default Router;
