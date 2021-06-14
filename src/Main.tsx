import React from "react";
import { Box } from "@chakra-ui/react";
import { UsernameInput, FriendInput, ChatBox } from "./components/Main";

const Main = () => (
  <Box>
    {/* login */}
    <UsernameInput />

    {/* input friend's username to contact */}
    <FriendInput />

    {/* chat box */}
    <ChatBox />
  </Box>
);

export default Main;
