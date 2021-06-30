import * as React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import {
  ChakraProvider,
  theme,
  // Box,
} from "@chakra-ui/react";
import Room from "./routes/Room";
import CreateRoom from "./routes/CreateRoom";

const App = () => (
  <ChakraProvider theme={theme}>
    {/* <Box>Hello!</Box> */}
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
