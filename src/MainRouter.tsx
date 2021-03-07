import React from "react";
import { Route, Switch } from "react-router-dom";
import MyAppBar from "./components/MyAppbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

const MainRouter = (): JSX.Element => {
  return (
    <>
      <MyAppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default MainRouter;
