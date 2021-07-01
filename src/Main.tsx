import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {
  Home,
  Room,
} from "./screens";

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/room" component={Room} />
    </Switch>
  </BrowserRouter>
);

export default Main;
