import React, { MouseEventHandler, ChangeEventHandler } from "react";
import {
  Box,
  Button, Input, Text,
} from "@chakra-ui/react";
import { useUser } from "../../contexts/user.context";
import * as emitter from "../../utils/emitter";
import { useSocket } from "../../contexts/socket.context";

const FriendInput = () => {
  const { username, updateFriendname, friendname } = useUser();
  const { socket } = useSocket();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFriendname(e.target.value);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    // create an offer
    // const peerConnection = new RTCPeerConnection();
    // const offer = await peerConnection.createOffer();
    // peerConnection.setLocalDescription(offer);

    // send that offer
    emitter.send(socket, {
      type: "offer",
      content: {
        friendname,
        // offer,
      },
    });
  };

  return (
    <Box>
      <Text>
        Hello&nbsp;
        <Box as="span" color="telegram.500">{username}</Box>
        ,&nbsp;
        with who you wanna chat?
      </Text>
      <Input type="text" value={friendname} placeholder="friendname" onChange={handleInputChange} />
      <Button onClick={handleButtonClick}>Call</Button>
    </Box>
  );
};

export default FriendInput;
