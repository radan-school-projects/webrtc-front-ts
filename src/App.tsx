import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Main from "./Main";
import { UserProvider } from "./contexts/user.context";
import { SocketProvider } from "./contexts/socket.context";
import { WebRTCProvider } from "./contexts/webrtc.context";

const App = () => (
  <ChakraProvider theme={theme}>
    <UserProvider>
      <SocketProvider>
        <WebRTCProvider>
          <Main />
        </WebRTCProvider>
      </SocketProvider>
    </UserProvider>
  </ChakraProvider>
);

export default App;
