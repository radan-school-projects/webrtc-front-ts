import * as React from "react";
import {
  ChakraProvider,
  theme,
  Box,
} from "@chakra-ui/react";

const App = () => (
  <ChakraProvider theme={theme}>
    <Box>Hello!</Box>
  </ChakraProvider>
);

export default App;
