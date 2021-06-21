import React, {
  createContext,
  ReactNode,
  useContext,
  MutableRefObject,
  useRef,
} from "react";

interface WebRTCContextValue {
  peerRef: MutableRefObject<RTCPeerConnection | null> | null;
}

const defaultWebRTCContextValue: WebRTCContextValue = {
  // peerRef: useRef(null),
  peerRef: null,
  // peer: null,
  // updatePeer: (): void => {},
};

const webRTCContext = createContext<WebRTCContextValue>(defaultWebRTCContextValue);

export const useWebRTC = () => useContext(webRTCContext);

interface WebRTCProviderProps {
  children: ReactNode;
}
export const WebRTCProvider = ({ children }: WebRTCProviderProps) => {
  const peerRef = useRef<RTCPeerConnection | null>(null);

  const value = {
    peerRef,
  };

  return (
    <webRTCContext.Provider value={value}>
      {children}
    </webRTCContext.Provider>
  );
};
