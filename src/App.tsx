import React from "react";
import {
  ChakraProvider,
  // theme,
} from "@chakra-ui/react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import {
  Home,
  Room,
} from "./screens";
import theme from "./theme";

import "animate.css/animate.min.css";
import "tailwindcss/tailwind.css";
import "./css/app.css";

const App = () => (
  <ChakraProvider theme={theme} resetCSS>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/room" component={Room} />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
