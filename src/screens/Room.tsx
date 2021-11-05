/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import {
  Box,
  Flex,
  Button,
  Image,
  // AspectRatio,
  Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import socket from "../app/socket";
import emitter from "../app/emitter";
import { IResponse } from "../types";
import notifier from "../app/notifier";
import { rtcConfig } from "../app/webrtc";
import src from "../images/room/phone-icon.svg";

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
  const isCaller = React.useState<boolean>(state.isCaller);

  // const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [fullScreenElement, setFullScreenElement] = React.useState(document.fullscreenElement);

  const userVideoRef = React.useRef<HTMLVideoElement>(null);
  const partnerVideoRef = React.useRef<HTMLVideoElement>(null);

  const peerRef = React.useRef<RTCPeerConnection>();
  // const socketRef = React.useRef<Socket>(socket);

  // const otherUser = React.useRef<string>();
  const userStream = React.useRef<MediaStream>();

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

        // ! IDK
        setUserAspectRatio(stream.getVideoTracks()[0].getSettings().aspectRatio);
        // console.log(userAspectRatio);

        // ! Just for UI Dev purpose
        partnerVideoRef.current!.srcObject = stream;//! remove this line!!!
        // const elem = document.documentElement;
        // elem.requestFullscreen();

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

  // React.useEffect(() => {
  //   const fullScreenElement = document.fullscreenElement;
  //   // If no element is in full-screen
  //   if (fullScreenElement !== null) {
  //     // console.log("FullScreen mode is activated");
  //     setIsFullScreen(true);
  //   } else {
  //     // console.log("FullScreen mode is not activated");
  //     setIsFullScreen(false);
  //   }
  // }, [
  //   // document.fullscreenElement,
  //   isFullScreen,
  //   setIsFullScreen,
  // ]);
  React.useEffect(() => {
    const fullscreenchangeHandler = () => {
      setFullScreenElement(document.fullscreenElement);
      // fullScreenElementRef.current = document.fullscreenElement;
    };

    document.addEventListener("fullscreenchange", fullscreenchangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenchangeHandler);
    };
  }, [

  ]);

  function makeFullScreen() {
    // setIsFullScreen(true);
    const elem = document.documentElement;
    elem.requestFullscreen();
  }

  return (
    <Box
      h="100vh"
      w="100vw"
      overflowX="hidden"
    >
      {/* <Text fontSize="4xl" color={socket.connected ? "tomato" : "black"}>This is a room</Text>
      <Text fontSize="4xl">
        Your name is&nbsp;
        {state.username}
        &nbsp;
        and you&apos;ll chat with&nbsp;
        {state.friendname}
      </Text> */}
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
        d={fullScreenElement === null ? "flex" : "none"}
        alignItems="center"
        justifyContent="center"
      >
        <Text
          color="white"
          fontSize="2xl"
        >
          Tap Here To Enter FullScreen
        </Text>
      </Box>
      <Flex
        // w="6rem"
        // h="8rem"
        // bgColor="blue"
        pos="absolute"
        top="1rem"
        left="1rem"
        // borderRadius="0.5rem"
        // borderColor="#F58E1F"
        // borderWidth="0.2rem"
        alignItems="center"
        // as={motion.div} import { motion } from "framer-motion"
        // dragConstraints={{
        //   top: 0,
        //   left: 0,
        //   right: 100,
        //   bottom: 100,
        // }}
        maxW="25%"
      >
        {/* <Text fontSize="xl">{`You(${state.username})`}</Text> */}
        {/* <AspectRatio maxW="8rem"> */}
        <video
          autoPlay
          ref={userVideoRef}
          className={`
            rounded-md
            ${
              userAspectRatio && userAspectRatio === (4 / 3 || 16 / 9)
                ? "w-32" : "w-24"
            }
          `}
        >
          <track kind="captions" />
        </video>
        {/* </AspectRatio> */}
      </Flex>
      <Flex
        w="100%"
        h="100%"
        bgColor="#F6F6F6"
        alignItems="center"
      >
        {/* <Text fontSize="xl">{`${state.friendname}`}</Text> */}
        <video
          autoPlay
          ref={partnerVideoRef}
        >
          <track kind="captions" />
        </video>
        <Button
          colorScheme="red"
          position="absolute"
          bottom="1.8rem"
          left="50%"
          transform="translateX(-50%)"
          w="3.4rem"
          h="3.4rem"
          borderRadius="20rem"
          className="elevation"
        >
          {/* End Call */}
          {/* <EndCallIcon
            fill="#fff"
          /> */}
          <Image
            src={src}
            w="full"
          />
        </Button>
      </Flex>
    </Box>
  );
};

export default Room;
