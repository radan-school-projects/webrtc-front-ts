import React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Main from "./Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

const App = () => (
  <ChakraProvider theme={theme}>
    <Main />
  </ChakraProvider>
);

export default App;
