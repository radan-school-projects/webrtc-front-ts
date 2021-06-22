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
import { useWebRTC } from "../../contexts/webrtc.context";
import { rtcConfig } from "../../app/webrtc";

const FriendInput = () => {
  const { username, updateFriendname, friendname } = useUser();
  const { socket } = useSocket();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent>({
    title: "",
    description: "",
  });
  const [userOffering, setUserOffering] = useState("");
  const [
    offeredSessionDesc,
    setOfferedSessionDesc,
  ] = useState<RTCSessionDescription | null>(null);
  // const { peerRef, updateLocalStream, remoteStream } = useWebRTC();
  const {
    peerRef,
    remoteStreamRef,
    localStreamRef,
    // streamRef,
    // remoteStream,
    // localStream,
    // updateLocalStream,
    // updateRemoteStream,
  } = useWebRTC();

  const notifyPeerError = () => {
    notifier.toast({
      status: "error",
      title: "Peer error",
      description: "Peer connexion not set properly",
    });
  };

  // // * moved this in webrtc context file
  const iceListener = (iceEvent: RTCPeerConnectionIceEvent) => {
    const { candidate } = iceEvent;
    if (candidate) {
      emitter.send(socket, {
        type: "candidate",
        content: {
          candidate,
          friendname,
        },
      });
    }
  };
  // // * moved to wbrtc context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const connectionListener = (ev: Event) => {
    notifier.toast({
      status: "info",
      title: "Peer connected",
      description: `You're connected with ${friendname}`,
    });
  };
  const trackListener = async (ev: RTCTrackEvent) => {
    // streamRef?.current.remote.addTrack(ev.track);
    // remoteStream.addTrack(ev.track);
    remoteStreamRef?.current.addTrack(ev.track);
    // .addTrack(ev.track);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (!peerRef) {
      notifyPeerError();
      return;
    }

    // peerRef.current = new RTCPeerConnection(rtcConfig);
    const peer = new RTCPeerConnection(rtcConfig);
    // const peer = peerRef.current;

    peer.onicecandidate = iceListener;
    peer.onconnectionstatechange = connectionListener;
    peer.ontrack = trackListener;

    peerRef.current = peer;

    // peer.ontrack = async (ev) => {
    //   streamRef?.current.remote.addTrack(ev.track);
    // };

    const offer = await peer.createOffer();
    const localDesc = new RTCSessionDescription(offer);
    peer.setLocalDescription(localDesc);

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
    updateFriendname(userOffering);

    if (!offeredSessionDesc) {
      notifier.toast({
        status: "error",
        title: "Offer error",
        description: "the offer disappeared",
      });
      return;
    }

    if (!peerRef) {
      notifyPeerError();
      return;
    }

    // peerRef.current = new RTCPeerConnection(rtcConfig);
    const peer = new RTCPeerConnection(rtcConfig);
    // const peer = peerRef.current;

    peer.onicecandidate = iceListener;
    peer.onconnectionstatechange = connectionListener;
    peer.ontrack = trackListener;

    peerRef.current = peer;

    // peer.ontrack = async (ev) => {
    //   streamRef?.current.remote.addTrack(ev.track);
    //   remoteStream.addTrack(ev.track);
    // };

    const remoteDesc = new RTCSessionDescription(offeredSessionDesc);
    await peer.setRemoteDescription(remoteDesc);

    const answer = await peer.createAnswer();
    const localDesc = new RTCSessionDescription(answer);
    peer.setLocalDescription(localDesc);

    emitter.send(socket, {
      type: "answer",
      content: {
        answer,
        // caller: friendname,
        caller: userOffering,
      },
    });

    const localStream1 = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    // localStream.getTracks().forEach((track) => {
    //   peer.addTrack(track, localStream1);
    // });
    localStreamRef?.current.getTracks().forEach((track) => {
      peer.addTrack(track, localStream1);
    });
    // updateLocalStream(localStream1);
    (localStreamRef as React.MutableRefObject<MediaStream>).current = localStream1;

    // if (streamRef) {
    //   streamRef.current.local = localStream;
    // }
  };
  const onRefuse = () => setIsDialogOpen(false);

  const responseListener = async (response: IResponse) => {
    const { type, success, content } = response;

    switch (type) {
      case "offer": {
        const { description, emitter: expeditor, offer } = content;
        if (success) {
          setUserOffering(expeditor);
          setOfferedSessionDesc(offer);
          setDialogContent({
            ...dialogContent,
            title: "Incoming offer",
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
          if (!peerRef) {
            notifyPeerError();
            return;
          }

          const peer = peerRef.current;

          if (!peer) {
            notifyPeerError();
            return;
          }

          const RemoteDesc = new RTCSessionDescription(answer);
          await peer.setRemoteDescription(RemoteDesc);

          // peer.ontrack = async (ev) => {
          //   streamRef?.current.remote.addTrack(ev.track);
          // };

          // eslint-disable-next-line max-len
          const localStream1 = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          // localStream.getTracks().forEach((track) => {
          //   peer.addTrack(track, localStream1);
          // });
          localStreamRef?.current.getTracks().forEach((track) => {
            peer.addTrack(track, localStream1);
          });
          // updateLocalStream(localStream1);
          (localStreamRef as React.MutableRefObject<MediaStream>).current = localStream1;
        } else {
          notifier.toast({
            title: "Oups!",
            description,
            status: "error",
          });
        }
      }
        break;

      case "candidate": {
        const { description, candidate } = content;
        if (success) {
          if (!peerRef) {
            notifyPeerError();
            return;
          }

          const peer = peerRef.current;

          if (!peer) {
            notifyPeerError();
            return;
          }

          peer.addIceCandidate(candidate);
        } else {
          notifier.toast({
            title: "Oups!",
            description,
            status: "error",
          });
        }
      }
        break;

      default: // jus do nothing
        break;
    }
  };

  useEffect(() => {
    socket.on("response", responseListener);
    return () => {
      socket.off("response", responseListener);
    };
  }, []);

  // * moved this in webrtc context provider
  // useEffect(() => {
  //   peerRef?.current?.addEventListener("icecandidate", iceListener);
  //   return () => {
  //     peerRef?.current?.removeEventListener("icecandidate", iceListener);
  //   };
  // }, [peerRef, peerRef?.current]);

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
        onAccept={onAccept}
        onRefuse={onRefuse}
      />
    </Box>
  );
};

export default FriendInput;
