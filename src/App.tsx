import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";

import "sweetalert2/src/sweetalert2.scss";
import "animate.css/animate.min.css";
import "tailwindcss/tailwind.css";

import "./css/app.css";
import Routes from "./Routes";
import { SocketProvider } from "./contexts/socket.context";
import { UserProvider } from "./contexts/user.context";

const App = () => (
  <ChakraProvider theme={theme} resetCSS>
    <SocketProvider>
      <UserProvider>
        <Routes />
      </UserProvider>
    </SocketProvider>
  </ChakraProvider>
);

export default App;
