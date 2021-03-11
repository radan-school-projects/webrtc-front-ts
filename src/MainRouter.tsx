import React from "react";
import { Route, Switch } from "react-router-dom";
import MyAppBar from "./components/MyAppbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const MainRouter = (): JSX.Element => {
  return (
    <>
      <MyAppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
};

export default MainRouter;
