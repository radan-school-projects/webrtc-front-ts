import React, {
  MouseEventHandler,
  ChangeEventHandler,
  useEffect,
  useState,
  useRef,
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
  const [dialogContent, setDialogContent] = useState<DialogContent>({
    title: "",
    description: "",
  });
  // const [isOfferAccepted, setIsOfferAccepted] = useState(false);
  const [userOffering, setUserOffering] = useState("");
  const [
    offeredSessionDesc,
    setOfferedSessionDesc,
  ] = useState<RTCSessionDescription | null>(null);
  // ====
  const peerRef = useRef<RTCPeerConnection | null>(null);

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    // create an offer // maybe store it inside a ref hook
    // const peerConnection = new RTCPeerConnection();
    peerRef.current = new RTCPeerConnection();

    // const offer = await peerConnection.createOffer();
    // peerConnection.setLocalDescription(offer);
    const offer = await peerRef.current.createOffer();
    const localDesc = new RTCSessionDescription(offer);
    peerRef.current.setLocalDescription(localDesc);

    // send that offer
    emitter.send(socket, {
      type: "offer",
      content: {
        friendname,
        offer,
      },
    });
  };

  const onAccept = async () => {
    setIsDialogOpen(false);
    // setIsOfferAccepted(true);
    // console.log(userOffering);
    updateFriendname(userOffering);

    if (offeredSessionDesc) {
      // const peerConnection = new RTCPeerConnection();
      // peerRef.current = peerConnection;
      peerRef.current = new RTCPeerConnection();
      const remoteDesc = new RTCSessionDescription(offeredSessionDesc);
      // peerConnection.setRemoteDescription(remoteDesc);
      // peerRef.current = peerConnection;
      await peerRef.current.setRemoteDescription(remoteDesc);
      // peerRef.current = await peerRef.current.setRemoteDescription(remoteDesc);

      // create an answer
      const answer = await peerRef.current.createAnswer();
      const localDesc = new RTCSessionDescription(answer);

      peerRef.current.setLocalDescription(localDesc);

      // const answer = await peerConnection.createAnswer();
      emitter.send(socket, {
        type: "answer",
        content: {
          answer,
          // caller: friendname,
          caller: userOffering,
        },
      });
    }
  };
  const onRefuse = () => setIsDialogOpen(false);

  const responseListener = async (response: IResponse) => {
    // console.log("bouuia!!");
    // const { type, success, content } = response as IResponse;
    const { type, success, content } = response;

    switch (type) {
      case "offer": {
        const { description, emitter: expeditor, offer } = content;
        if (success) {
          // show an alert dialog
          setUserOffering(expeditor);
          setOfferedSessionDesc(offer);
          setDialogContent({
            ...dialogContent,
            title: "Incoming offer",
            // description: content.description,
            description,
          });
          setIsDialogOpen(true);
        } else {
          notifier.toast({
            title: "Oups!",
            description,
            status: "error",
          });
        }
      }
        break;

      case "answer": {
        const { answer, /* emitter: answerer, */ description } = content;
        if (success) {
          // updateFriendname(answerer);

          if (peerRef.current) {
            const RemoteDesc = new RTCSessionDescription(answer);
            await peerRef.current.setRemoteDescription(RemoteDesc);
          }
        } else {
          notifier.toast({
            title: "Oups!",
            description,
            status: "error",
          });
        }
      }
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
        content={dialogContent}
        // onClose={onDialogClose}
        onAccept={onAccept}
        onRefuse={onRefuse}
      />
    </Box>
  );
};

export default FriendInput;
