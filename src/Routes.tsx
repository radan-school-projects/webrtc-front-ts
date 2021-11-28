import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import {
  Home,
  Room,
  RoomUI,
  Room2,
} from "./screens";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./contexts/user.context";
// import socket from "./app/socket";
import { useSocket } from "./contexts/socket.context";

const Routes = () => {
  const { socket } = useSocket();
  const { username, friendname } = useUser();
  const isAuthenticated = socket.connected === true && !username === false && !friendname === false;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/roomui" component={RoomUI} />
        <ProtectedRoute isAuthenticated={isAuthenticated} authenticationPath="/" path="/room" component={Room} />
        <ProtectedRoute isAuthenticated={isAuthenticated} authenticationPath="/" path="/room2" component={Room2} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
