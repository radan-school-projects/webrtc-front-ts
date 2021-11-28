/* eslint-disable prefer-destructuring */
import React from "react";
// import {
//   Box,
//   Flex,
//   Button,
//   Text,
// } from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { FiPhoneOff } from "react-icons/fi";
// import Draggable from "react-draggable";
import { motion } from "framer-motion";

// import socket from "../app/socket";
import emitter from "../app/emitter";
import { IResponse } from "../types";
import notifier from "../app/notifier";
import { rtcConfig } from "../app/webrtc";
import { useUser } from "../contexts/user.context";
import { useSocket } from "../contexts/socket.context";

interface Params {}
interface SaticConText {}
interface State {
  // friendname: string;
  // username: string;
  isCaller: boolean;
}

const tempDefaultState: State = {
  // friendname: "strawberry",
  // username: "marbblejelly",
  isCaller: true,
};

const Room = ({
  location: { state = tempDefaultState }, history,
}: RouteComponentProps<Params, SaticConText, State>) => {
  const { friendname, updateFriendname: setFriendName } = useUser();
  const { socket } = useSocket();

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

  function handleICECandidateEvent(e: RTCPeerConnectionIceEvent) {
    if (e.candidate) {
      emitter.send(socket, {
        type: "ice-candidate",
        content: {
          friendname/* : state.friendname, */,
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

  const responseEventHandler = (response: IResponse) => {
    const { type, success, content } = response;

    switch (type) {
      case "peer-offer":
        if (success) {
          peerRef.current = createPeer();
          const desc = new RTCSessionDescription(content.offer);
          peerRef.current!.setRemoteDescription(desc)
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
                  caller: /* : state.friendname, */ friendname, // * the one we want to answer
                  answer: peerRef.current!.localDescription,
                },
              });
            })
            .catch((err) => console.log(err));
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

      case "peer-leave":
        if (success) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleLeave();
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

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideoRef.current!.srcObject = stream;
        userStreamRef.current = stream;

        setUserAspectRatio(userStreamRef.current!.getVideoTracks()[0].getSettings().aspectRatio);

        // ! Just for UI Dev purpose
        partnerVideoRef.current!.srcObject = stream;//! remove this line!!!

        if (isCaller) { // * Call our partner
          peerRef.current = createPeer();
          peerRef.current!.createOffer()
            .then((offer) => {
              peerRef.current!.setLocalDescription(offer);
              const payload = {
                target: friendname/* state.friendname */,
                offer,
              };
              return payload;
            })
            .then((payload) => {
              emitter.send(socket, {
                type: "peer-offer",
                content: payload,
              });
            })
            .catch((err) => console.log(err));

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

  const fullscreenchangeHandler = () => {
    setFullScreenElement(document.fullscreenElement);
  };

  React.useEffect(() => {
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

  function exitFullScreen() {
    document.exitFullscreen();
  }

  function handleLeave() {
    partnerVideoRef.current!.srcObject = null;
    peerRef.current!.close();
    peerRef.current!.onicecandidate = null;
    peerRef.current!.ontrack = null;
    userStreamRef.current!.getTracks().forEach((track) => {
      track.stop();
    });
    userStreamRef.current = undefined;
    peerRef.current = undefined;

    setFriendName(""); // from user context
    history.replace("/");

    //     connectedUser = null;
    // theirVideo.src = null;
    // yourConnection.close();
    // yourConnection.onicecandidate = null;
    // yourConnection.onaddstream = null;
    // setupPeerConnection(stream);
  }

  function endCall() {
    emitter.send(socket, {
      type: "peer-leave",
      content: {
        target: friendname,
      },
    });

    handleLeave();
  }

  const constraintsRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="w-screen h-screen bg-gray-300" ref={constraintsRef}>
      <motion.div
        drag
        className="absolute top-2 left-2 z-10"
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragPropagation
      >
        <video
          autoPlay
          ref={userVideoRef}
          className="w-40  rounded-lg"
        >
          <track kind="captions" />
        </video>
      </motion.div>

      <div className="flex items-center justify-center h-full w-full z-0 overflow-hidden">
        <video
          autoPlay
          ref={partnerVideoRef}
          className="sm:h-full"
        >
          <track kind="captions" />
        </video>
      </div>

      <button
        className="absolute bottom-6 left-[50%] translate-x-[-50%] z-20 p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        type="button"
        onClick={endCall}
      >
        <FiPhoneOff className="w-5 h-5 inline-block text-white" />
      </button>
    </div>
  );
};

export default Room;
