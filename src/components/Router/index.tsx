import React from "react";
import { Switch, Route } from "react-router-dom";
import Onboard from "screens/Onboard";

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Onboard} />
    </Switch>
  );
};
