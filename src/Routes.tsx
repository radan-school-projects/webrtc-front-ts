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
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./contexts/user.context";
import { useSocket } from "./contexts/socket.context";

const Routes = () => {
  const { isSocketConnected } = useSocket();
  const { username, friendname } = useUser();
  const isAuthenticated =
    isSocketConnected === true && !username === false && !friendname === false;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute isAuthenticated={isAuthenticated} authenticationPath="/" path="/room" component={Room} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
