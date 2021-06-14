import React from "react";
import { Box, Button, Input } from "@chakra-ui/react";

const FriendInput = () => (
  <Box>
    <Input type="text" name="friendname" placeholder="friendname" />
    <Button>Call</Button>
  </Box>
);

export default FriendInput;
