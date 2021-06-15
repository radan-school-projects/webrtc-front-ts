import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Main from "./Main";
import { UserProvider } from "./contexts/user.context";

const App = () => (
  <ChakraProvider theme={theme}>
    <UserProvider>
      <Main />
    </UserProvider>
  </ChakraProvider>
);

export default App;
