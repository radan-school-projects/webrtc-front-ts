import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";

interface FriendNameProps {
  friendname: string;
  handleFriendNameInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleCallButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

const FriendName = ({
  friendname,
  handleFriendNameInputChange,
  handleCallButtonClick,
}: FriendNameProps) => (
  <Box
    w="20.5rem"
    m="0 auto"
  >
    <Text
      color="#7C85A7"
    >
      Now Try To
    </Text>
    <Text
      fontSize="2.3rem"
      color="#F58E1F"
    >
      Call People
    </Text>
    <Text
      color="#7C85A7"
      mt="-0.5rem"
      mb="1.1rem"
    >
      Or wait them to call you
    </Text>
    <Input
      type="text"
      placeholder="friendname"
      value={friendname}
      onChange={handleFriendNameInputChange}
      color="#7C85A7"
      bgColor="#EEEFF7"
      border="0"
      h="3.5rem"
      borderRadius="0.5rem"
      _focus={{
        outline: "2px solid rgba(85, 100, 169, 0.6)",
        outlineOffset: "0",
        // boxShadow: "0 0 0 2px rgba(85, 100, 169, 0.6)",
      }}
      mb="1.1rem"
    />
    <Button
      onClick={handleCallButtonClick}
      w="full"
      h="3.5rem"
      borderRadius="0.5rem"
      bgColor="#5564A9"
      color="white"
      _focus={{
        boxShadow: "0 0 0 2px rgba(85, 100, 169, 0.6)",
      }}
    >
      Call&apos;em
    </Button>
  </Box>
);

export default FriendName;
