import React, {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Socket } from "socket.io-client";
import socket from "../app/socket";

interface SocketContextValue {
  socket: Socket;
  isSocketConnected: boolean;
}

const defaultSocketContextValue: SocketContextValue = {
  socket,
  isSocketConnected: false,
};

const socketContext = createContext<SocketContextValue>(defaultSocketContextValue);

export const useSocket = () => useContext(socketContext);

interface SocketProviderProps {
  children: ReactNode;
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isSocketConnected, setIsSocketConnected] = React.useState<boolean>(false);

  const value = {
    socket,
    isSocketConnected,
  };

  const handleBeforeUnload = (e:BeforeUnloadEvent) => {
    if (isSocketConnected) {
      e.returnValue = "You will lose your connection to the socket!";
    }
  };

  const handleSockectConn = () => {
    setIsSocketConnected(true);
  };
  const handleSockectDisconn = () => {
    setIsSocketConnected(false);
  };

  React.useEffect(() => {
    socket.on("connect", handleSockectConn);
    socket.on("disconnect", handleSockectDisconn);

    return () => {
      socket.off("connect", handleSockectConn);
      socket.off("disconnect", handleSockectDisconn);
    };
  }, [

  ]);

  React.useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    isSocketConnected,
  ]);

  return (
    <socketContext.Provider value={value}>
      {children}
    </socketContext.Provider>
  );
};
