import React from "react";
import {
  ChakraProvider,
  theme,
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

const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/room" component={Room} />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
