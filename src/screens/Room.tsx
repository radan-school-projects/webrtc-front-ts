/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import socket from "../app/socket";
import emitter from "../app/emitter";
import { IResponse } from "../types";
import notifier from "../app/notifier";
import { rtcConfig } from "../app/webrtc";

interface Params {}
interface SaticConText {}
interface State {
  friendname: string;
  username: string;
  isCaller: boolean;
}

const Room = ({ location: { state } }: RouteComponentProps<Params, SaticConText, State>) => {
  /**
   * Stored this as a state because later while chatting,
   * someone else would like to join
   * then the joiner will be the new caller
   * and every one else are the called
   */
  const isCaller = React.useState<boolean>(state.isCaller);

  const userVideoRef = React.useRef<HTMLVideoElement>(null);
  const partnerVideoRef = React.useRef<HTMLVideoElement>(null);

  const peerRef = React.useRef<RTCPeerConnection>();
  // const socketRef = React.useRef<Socket>(socket);

  // const otherUser = React.useRef<string>();
  const userStream = React.useRef<MediaStream>();

  const responseEventHandler = (response: IResponse) => {
    const { type, success, content } = response;

    switch (type) {
      case "peer-offer":
        if (success) {
          peerRef.current = createPeer();
          const desc = new RTCSessionDescription(content.offer);
          peerRef.current.setRemoteDescription(desc)
            .then(() => {
              userStream.current!.getTracks().forEach((track) => {
                peerRef.current!.addTrack(track, userStream.current!);
              });
            })
            .then(() => peerRef.current!.createAnswer())
            .then((answer) => peerRef.current!.setLocalDescription(answer))
            .then(() => {
              // const payload = ;
              // socketRef.current.emit("answer", payload);
              emitter.send(socket, {
                type: "peer-answer",
                content: {
                  // target: incoming.caller,
                  // caller: socketRef.current.id,
                  // target: state.friendname,
                  caller: state.friendname, // * the one we want to answer
                  answer: peerRef.current!.localDescription,
                },
              });
            });
        } else {
          notifier.error({
            description: content.description,
          });
        }
        break;

      case "peer-answer":
        if (success) {
          const desc = new RTCSessionDescription(content.answer);
          peerRef.current!.setRemoteDescription(desc).catch((e) => console.log(e));
        } else {
          notifier.error({
            description: content.description,
          });
        }
        break;

      case "ice-candidate":
        if (success) {
          const candidate = new RTCIceCandidate(content.candidate);
          peerRef.current!.addIceCandidate(candidate)
            .catch((e) => console.log(e));
        } else {
          notifier.error({
            description: content.description,
          });
        }
        break;

      default:
        break;
    }
  };

  function handleICECandidateEvent(e: RTCPeerConnectionIceEvent) {
    if (e.candidate) {
      emitter.send(socket, {
        type: "ice-candidate",
        content: {
          friendname: state.friendname,
          candidate: e.candidate,
        },
      });
    }
  }
  function handleTrackEvent(e: RTCTrackEvent) {
    partnerVideoRef.current!.srcObject = e.streams[0];
  }

  function createPeer(/* userID: string */) {
    const peer = new RTCPeerConnection(rtcConfig);

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;

    return peer;
  }

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideoRef.current!.srcObject = stream;
        userStream.current = stream;

        if (isCaller) { // * Call our partner
          peerRef.current = createPeer();

          peerRef.current!.createOffer()
            .then((offer) => {
              peerRef.current!.setLocalDescription(offer);
              const payload = {
                target: state.friendname,
                // caller: socket.id,
                // caller: state.username,
                offer,
              };
              return payload;
            })
            .then((payload) => {
              // socket.emit("offer", payload);
              emitter.send(socket, {
                type: "peer-offer",
                content: payload,
              });
            })
            .catch((e) => console.log(e));

          userStream.current!.getTracks().forEach((track) => {
            peerRef.current!.addTrack(track, userStream.current!);
          });
        }

        socket.on("response", responseEventHandler);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      socket.off("response", responseEventHandler);
    };
  }, [

  ]);

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
      <Flex>
        <Box>
          <Text fontSize="xl">You</Text>
          <video autoPlay ref={userVideoRef}>
            <track kind="captions" />
          </video>
        </Box>
        <Box>
          <Text fontSize="xl">Your friend</Text>
          <video autoPlay ref={partnerVideoRef}>
            <track kind="captions" />
          </video>
        </Box>
      </Flex>
    </Box>
  );
};

export default Room;
