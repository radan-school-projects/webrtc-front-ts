import React from "react";
import { Box, Button, Input } from "@chakra-ui/react";

const UsernameInput = () => (
  <Box>
    <Input type="text" name="username" placeholder="username" />
    <Button>Okay</Button>
  </Box>
);

export default UsernameInput;
