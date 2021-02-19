import React from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/Appbar/Appbar";
import Home from "./pages/Home/Home";
import NameForm from "./pages/NameForm/NameForm";

const MainRouter = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={NameForm} />
      </Switch>
    </>
  );
};

export default MainRouter;
