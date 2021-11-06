/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import {
  Box,
  Flex,
  Button,
  // Image,
  // AspectRatio,
  Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FiPhoneOff } from "react-icons/fi";

import socket from "../app/socket";
import emitter from "../app/emitter";
import { IResponse } from "../types";
import notifier from "../app/notifier";
import { rtcConfig } from "../app/webrtc";
// import src from "../images/room/phone-icon.svg";

interface Params {}
interface SaticConText {}
interface State {
  friendname: string;
  username: string;
  isCaller: boolean;
}

const tempDefaultState: State = {
  friendname: "strawberry",
  username: "marbblejelly",
  isCaller: true,
};

const Room = ({
  location: {
    state = tempDefaultState,
  },
}: RouteComponentProps<Params, SaticConText, State>) => {
  /**
   * Stored this as a state because later while chatting,
   * someone else would like to join
   * then the joiner will be the new caller
   * and every one else are the called
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCaller, setIscaller] = React.useState<boolean>(state.isCaller);

  // const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [fullScreenElement, setFullScreenElement] = React.useState(document.fullscreenElement);

  const userVideoRef = React.useRef<HTMLVideoElement>(null);
  const partnerVideoRef = React.useRef<HTMLVideoElement>(null);

  const peerRef = React.useRef<RTCPeerConnection>();
  // const socketRef = React.useRef<Socket>(socket);

  // const otherUser = React.useRef<string>();
  const userStreamRef = React.useRef<MediaStream>();

  const [userAspectRatio, setUserAspectRatio] = React.useState<number>();

  const responseEventHandler = (response: IResponse) => {
    const { type, success, content } = response;

    switch (type) {
      case "peer-offer":
        if (success) {
          peerRef.current = createPeer();
          const desc = new RTCSessionDescription(content.offer);
          peerRef.current.setRemoteDescription(desc)
            .then(() => {
              userStreamRef.current!.getTracks().forEach((track) => {
                peerRef.current!.addTrack(track, userStreamRef.current!);
              });
            })
            .then(() => peerRef.current!.createAnswer())
            .then((answer) => peerRef.current!.setLocalDescription(answer))
            .then(() => {
              emitter.send(socket, {
                type: "peer-answer",
                content: {
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
          // if (candidate)
          peerRef.current!.addIceCandidate(candidate).catch((e) => console.log(e));
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
        userStreamRef.current = stream;

        setUserAspectRatio(userStreamRef.current!.getVideoTracks()[0].getSettings().aspectRatio);

        // ! Just for UI Dev purpose
        // partnerVideoRef.current!.srcObject = stream;//! remove this line!!!
        // const elem = document.documentElement;
        // elem.requestFullscreen();

        if (isCaller) { // * Call our partner
          peerRef.current = createPeer();
          peerRef.current!.createOffer()
            .then((offer) => {
              peerRef.current!.setLocalDescription(offer);
              const payload = {
                target: state.friendname,
                offer,
              };
              return payload;
            })
            .then((payload) => {
              emitter.send(socket, {
                type: "peer-offer",
                content: payload,
              });
            });

          userStreamRef.current!.getTracks().forEach((track) => {
            peerRef.current!.addTrack(track, userStreamRef.current!);
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

  React.useEffect(() => {
    const fullscreenchangeHandler = () => {
      setFullScreenElement(document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenchangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenchangeHandler);
    };
  }, [

  ]);

  function makeFullScreen() {
    const elem = document.documentElement;
    elem.requestFullscreen();
  }

  return (
    <Box
      h="100vh"
      w="100vw"
      overflowX="hidden"
    >
      <Box
        zIndex="999"
        pos="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        w="100vw"
        h="100vh"
        bgColor="rgba(21, 21, 21, 0.5)"
        onClick={makeFullScreen}
        // d={isFullScreen ? "none" : "flex"}
        d={{
          base: fullScreenElement === null ? "flex" : "none",
          lg: "none",
        }}
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        <Text
          color="white"
          fontSize="2xl"
        >
          Tap Here To Enter FullScreen
        </Text>
      </Box>
      <Flex
        pos="absolute"
        top={{
          base: "1rem",
          md: "1.5rem",
        }}
        left={{
          base: "1rem",
          md: "1.5rem",
        }}
        alignItems="center"
      >
        <video
          autoPlay
          ref={userVideoRef}
          className={`
            rounded-md
            ${
              userAspectRatio && (userAspectRatio === (4 / 3 || 16 / 9))
                ? "w-32 md:w-44" : "w-28 md:w-36"
            }
          `}
        >
          <track kind="captions" />
        </video>
      </Flex>
      <Flex
        w="full"
        h="full"
        bgColor="#F6F6F6"
        alignItems="center"
      >
        <video
          autoPlay
          ref={partnerVideoRef}
          className="h-full my-0 mx-auto"
        >
          <track kind="captions" />
        </video>
        <Box
          position="absolute"
          bottom="1.8rem"
          left="50%"
          transform="translateX(-250%)"
          d={{
            base: "none",
            lg: "block",
          }}
        >
          <Button
            colorScheme="whiteAlpha"
            w="3.4rem"
            h="3.4rem"
            borderRadius="20rem"
            className="elevation"
            onClick={makeFullScreen}
          >
            <AiOutlineFullscreen
              className="text-9xl font-black"
            />
          </Button>
        </Box>
        <Box
          position="absolute"
          bottom="1.8rem"
          left="50%"
          transform="translateX(-50%)"
        >
          <Button
            colorScheme="red"
            w="3.4rem"
            h="3.4rem"
            borderRadius="20rem"
            className="elevation"
          >
            <FiPhoneOff
              className=" text-xl font-black"
            />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Room;
