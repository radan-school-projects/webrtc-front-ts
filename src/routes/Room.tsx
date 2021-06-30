/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Socket } from "socket.io-client";
import {
  Box,
} from "@chakra-ui/react";
import socket from "../app/socket";

interface TParams {
  roomID: string
}

const Room = (props: RouteComponentProps<TParams>) => {
  const userVideo = React.useRef<HTMLVideoElement>(null);
  const partnerVideo = React.useRef<HTMLVideoElement>(null);

  const peerRef = React.useRef<RTCPeerConnection>();
  const socketRef = React.useRef<Socket>(socket);

  const otherUser = React.useRef<string>();
  const userStream = React.useRef<MediaStream>();

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
      userVideo.current!.srcObject = stream;
      userStream.current = stream;

      socketRef.current = socket.connect();

      socketRef.current.emit("join room", props.match.params.roomID);

      socketRef.current.on("other user", (userID) => {
        callUser(userID);
        otherUser.current = userID;
      });

      socketRef.current.on("user joined", (userID) => {
        otherUser.current = userID;
      });

      socketRef.current.on("offer", handleRecieveCall);

      socketRef.current.on("answer", handleAnswer);

      socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
    });
  }, []);

  function callUser(userID: string) {
    peerRef.current = createPeer(/* userID */);
    handleNegotiationNeededEvent(userID);
    userStream.current!.getTracks().forEach((track) => {
      peerRef.current!.addTrack(track, userStream.current!);
    });
  }

  function createPeer(/* userID: string */) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    // handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID: string) {
    peerRef.current!.createOffer()
      .then((offer) => {
        peerRef.current!.setLocalDescription(offer);
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: offer,
        };
        return payload;
      })
      .then((payload) => {
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming: any) {
    console.log(incoming);
    peerRef.current = createPeer(/* "" */);
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current.setRemoteDescription(desc)
      .then(() => {
        userStream.current!.getTracks().forEach((track) => {
          peerRef.current!.addTrack(track, userStream.current!);
        });
      })
      .then(() => peerRef.current!.createAnswer())
      .then((answer) => peerRef.current!.setLocalDescription(answer))
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current!.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message: any) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current!.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e: RTCPeerConnectionIceEvent) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming: any) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current!.addIceCandidate(candidate)
      .catch((e) => console.log(e));
  }

  function handleTrackEvent(e: RTCTrackEvent) {
    partnerVideo.current!.srcObject = e.streams[0];
  }

  return (
    <Box>
      <Box>
        <video autoPlay ref={userVideo}><track kind="captions" /></video>
      </Box>
      <Box>
        <video autoPlay ref={partnerVideo}><track kind="captions" /></video>
      </Box>
    </Box>
  );
};

export default Room;
