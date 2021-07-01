import React from "react";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import socket from "../app/socket";

interface Params {}
interface SaticConText {}
interface State {
  friendname: string;
  username: string;
}

// eslint-disable-next-line arrow-body-style
const Room = ({ location: { state } }: RouteComponentProps<Params, SaticConText, State>) => {
  return (
    <Box>
      <Text fontSize="4xl" color={socket.connected ? "tomato" : "black"}>This is a room</Text>
      <Text fontSize="4xl">
        Your name is&nbsp;
        {state.username}
        &nbsp;
        and you&apos;ll chat with&nbsp;
        {state.friendname}
      </Text>
    </Box>
  );
};

export default Room;
