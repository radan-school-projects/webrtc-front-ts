import React from "react";

import "sweetalert2/src/sweetalert2.scss";
import "animate.css/animate.min.css";
import "tailwindcss/tailwind.css";

import Routes from "./Routes";
import { SocketProvider } from "./contexts/socket.context";
import { UserProvider } from "./contexts/user.context";

const App = () => (
  <SocketProvider>
    <UserProvider>
      <Routes />
    </UserProvider>
  </SocketProvider>
);

export default App;
