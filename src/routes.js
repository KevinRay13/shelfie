import React from "react";
import { Switch, Route } from "react-router-dom";

import Form from "./components/form/Form";
import Dashboard from "./components/dashboard/Dashboard";

export default (
  <Switch>
    <Route component={Dashboard} exact path="/" />
    <Route component={Form} exact path="/add" />
    <Route component={Form} path="/edit/:id" />
  </Switch>
);
