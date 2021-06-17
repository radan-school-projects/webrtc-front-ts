import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useUser } from "../../contexts/user.context";

const ChatBox = () => {
  const { friendname } = useUser();

  return (
    <Box>
      <Text>
        you will be chatting with&nbsp;
        <Box as="span" color="telegram.500">{friendname}</Box>
      </Text>
      <Box>
        remote stream here!
      </Box>
      <Box>
        local stream here!
      </Box>
    </Box>
  );
};

export default ChatBox;
