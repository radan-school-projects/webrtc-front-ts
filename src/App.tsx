import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Main from "./Main";
import { UserProvider } from "./contexts/user.context";
import { SocketProvider } from "./contexts/socket.context";

const App = () => (
  <ChakraProvider theme={theme}>
    <UserProvider>
      <SocketProvider>
        <Main />
      </SocketProvider>
    </UserProvider>
  </ChakraProvider>
);

export default App;
