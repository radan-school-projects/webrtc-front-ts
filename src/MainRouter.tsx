import React from "react";
import { Route, Switch } from "react-router-dom";
import MyAppBar from "./components/MyAppbar";
import Home from "./pages/Home";
import NameForm from "./pages/NameForm";

const MainRouter = (): JSX.Element => {
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
