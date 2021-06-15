import React from "react";
import {
  Box,
  Button, Input, Text,
} from "@chakra-ui/react";
import { useUser } from "../../contexts/user.context";

const FriendInput = () => {
  const { username } = useUser();

  return (
    <Box>
      <Text>
        Hello&nbsp;
        <Box as="span" color="telegram.500">{username}</Box>
        ,&nbsp;
        with who you wanna chat?
      </Text>
      <Input type="text" name="friendname" placeholder="friendname" />
      <Button>Call</Button>
    </Box>
  );
};

export default FriendInput;
