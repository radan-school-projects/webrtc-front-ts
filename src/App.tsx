import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Main from "./Main";

const App = () => (
  <ChakraProvider theme={theme}>
    <Main />
  </ChakraProvider>
);

export default App;
