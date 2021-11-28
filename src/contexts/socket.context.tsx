import React, {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Socket } from "socket.io-client";
import socket from "../app/socket";

interface SocketContextValue {
  socket: Socket;
}

const defaultSocketContextValue: SocketContextValue = {
  socket,
};

const socketContext = createContext<SocketContextValue>(defaultSocketContextValue);

export const useSocket = () => useContext(socketContext);

interface SocketProviderProps {
  children: ReactNode;
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const value = {
    socket,
  };

  const handleBeforeUnload = (e:BeforeUnloadEvent) => {
    if (socket.connected) {
      e.returnValue = "You will lose your connection to the socket!";
    }
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [

  ]);

  return (
    <socketContext.Provider value={value}>
      {children}
    </socketContext.Provider>
  );
};
