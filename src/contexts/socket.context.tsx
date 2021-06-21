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

  return (
    <socketContext.Provider value={value}>
      {children}
    </socketContext.Provider>
  );
};
