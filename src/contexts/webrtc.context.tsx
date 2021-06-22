import React, {
  createContext,
  ReactNode,
  useContext,
  MutableRefObject,
  useRef,
} from "react";
// import { useSocket } from "./socket.context";
// import { useUser } from "./user.context";
// import * as emitter from "../utils/emitter";
// import * as notifier from "../utils/notifier";

// interface IStreams {
//   local: MediaStream;
//   remote: MediaStream;
// }
interface WebRTCContextValue {
  peerRef: MutableRefObject<RTCPeerConnection | null> | null;
  localStreamRef: MutableRefObject<MediaStream> | null;
  remoteStreamRef: MutableRefObject<MediaStream> | null;
  // localStream: MediaStream;
  // remoteStream: MediaStream;
  // updateLocalStream: (stream: MediaStream) => void;
  // updateRemoteStream: (stream: MediaStream) => void;
  // streamRef: MutableRefObject<IStreams> | null;
}

const defaultWebRTCContextValue: WebRTCContextValue = {
  peerRef: null,
  localStreamRef: null,
  remoteStreamRef: null,
  // localStream: new MediaStream(),
  // remoteStream: new MediaStream(),
  // updateLocalStream: (): void => {},
  // updateRemoteStream: (): void => {},
  // streamRef: null,
};

const webRTCContext = createContext<WebRTCContextValue>(defaultWebRTCContextValue);

export const useWebRTC = () => useContext(webRTCContext);

interface WebRTCProviderProps {
  children: ReactNode;
}
export const WebRTCProvider = ({ children }: WebRTCProviderProps) => {
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream>(new MediaStream());
  const remoteStreamRef = useRef<MediaStream>(new MediaStream());
  // const [localStream, setLocalStream] = React.useState(defaultWebRTCContextValue.localStream);
  // const [remoteStream, setRemoteStream] = React.useState(defaultWebRTCContextValue.localStream);
  // const streamRef = useRef<IStreams>({
  //   local: new MediaStream(),
  //   remote: new MediaStream(),
  // });
  // const { socket } = useSocket();
  // const { friendname } = useUser();

  // const iceListener = (iceEvent: RTCPeerConnectionIceEvent) => {
  //   console.log("boouia!!");
  //   const { candidate } = iceEvent;
  //   if (candidate) {
  //     emitter.send(socket, {
  //       type: "candidate",
  //       content: {
  //         candidate,
  //         friendname,
  //       },
  //     });
  //   }
  // };

  // const connectionListener = (/* ev: Event */) => {
  //   notifier.toast({
  //     status: "info",
  //     title: "Peer connected",
  //     description: `You're connected with ${friendname}`,
  //   });
  // };

  // const trackListener = async (ev: RTCTrackEvent) => {
  //   // streamRef?.current.remote.addTrack(ev.track);
  //   remoteStream.addTrack(ev.track);
  // };

  // React.useEffect(() => {
  //   peerRef?.current?.addEventListener("icecandidate", iceListener);
  //   peerRef?.current?.addEventListener("connectionstatechange", connectionListener);
  //   peerRef?.current?.addEventListener("track", trackListener);
  //   return () => {
  //     peerRef?.current?.removeEventListener("icecandidate", iceListener);
  //     peerRef?.current?.removeEventListener("connectionstatechange", connectionListener);
  //     peerRef?.current?.removeEventListener("track", trackListener);
  //   };
  // }, [
  //   peerRef?.current,
  //   // streamRef?.current,
  // ]);

  // const updateLocalStream = (stream: MediaStream) => {
  //   setLocalStream(stream);
  // };

  // const updateRemoteStream = (stream: MediaStream) => {
  //   setRemoteStream(stream);
  // };

  const value = {
    peerRef,
    localStreamRef,
    remoteStreamRef,
    // localStream,
    // remoteStream,
    // updateLocalStream,
    // updateRemoteStream,
    // streamRef,
  };

  return (
    <webRTCContext.Provider value={value}>
      {children}
    </webRTCContext.Provider>
  );
};
