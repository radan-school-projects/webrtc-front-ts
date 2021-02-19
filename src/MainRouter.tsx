import React from "react";
import { Route, Switch } from "react-router-dom";
import MyAppBar from "./components/MyAppbar/MyAppbar";
import Home from "./pages/Home/Home";
import NameForm from "./pages/NameForm/NameForm";

const MainRouter = () => {
  return (
    <>
      <MyAppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={NameForm} />
      </Switch>
    </>
  );
};

export default MainRouter;
