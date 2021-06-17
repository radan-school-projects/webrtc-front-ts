import React, {
  MouseEventHandler,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button, Input, Text,
} from "@chakra-ui/react";
import { useUser } from "../../contexts/user.context";
import * as emitter from "../../utils/emitter";
import { useSocket } from "../../contexts/socket.context";
import { IResponse } from "../../types";
import * as notifier from "../../utils/notifier";
import OfferDialog, { DialogContent } from "./OfferDialog";

const FriendInput = () => {
  const { username, updateFriendname, friendname } = useUser();
  const { socket } = useSocket();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onDialogClose = () => setIsDialogOpen(false);
  // const cancelRef = React.useRef();
  const [dialogContent, setDialogContent] = useState<DialogContent>({
    title: "",
    description: "",
  });

  const responseListener = (response: IResponse) => {
    console.log("bouuia!!");
    // const { type, success, content } = response as IResponse;
    const { type, success, content } = response;

    switch (type) {
      case "offer":
        if (success) {
          // show an alert dialog
          setDialogContent({
            ...dialogContent,
            title: "Incoming offer",
            description: content.description,
          });
          setIsDialogOpen(true);

          // // *** if the offer is accepted
          // const peerConnection = new RTCPeerConnection();

          // const { offer } = content;
          // const remoteDesc = new RTCSessionDescription(offer);
          // peerConnection.setRemoteDescription(remoteDesc);
          // // ***
        } else {
          notifier.toast({
            title: "Oups!",
            description: content.description,
            status: "error",
          });
        }
        break;

      case "answer":
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    socket.on("response", responseListener);
    return () => {
      socket.off("response", responseListener);
    };
  }, []);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFriendname(e.target.value);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    // create an offer
    const peerConnection = new RTCPeerConnection();
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);

    // send that offer
    emitter.send(socket, {
      type: "offer",
      content: {
        friendname,
        offer,
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
      <OfferDialog
        isOpen={isDialogOpen}
        onClose={onDialogClose}
        // title={dialogTitle}
        // description={dialogDescription}
        content={dialogContent}
      />
    </Box>
  );
};

export default FriendInput;
