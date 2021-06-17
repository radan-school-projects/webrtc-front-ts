import React, {
  createContext,
  ReactNode, useContext,
  // useState,
} from "react";
import { Socket } from "socket.io-client";
import socket from "../app/socket";

interface SocketContextValue {
  socket: Socket;
  // updateSocket: (socket: Socket) => void;
}

const defaultSocketContextValue: SocketContextValue = {
  socket,
  // updateSocket: (): void => {},
};

const socketContext = createContext<SocketContextValue>(defaultSocketContextValue);

export const useSocket = () => useContext(socketContext);

interface SocketProviderProps {
  children: ReactNode;
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  // const [socketState, setSocket] = useState<Socket>(defaultSocketContextValue.socket);

  // const updateSocket = (newSocket: Socket) => {
  //   setSocket(newSocket);
  // };

  const value = {
    socket,
    // updateSocket,
  };

  return (
    <socketContext.Provider value={value}>
      {children}
    </socketContext.Provider>
  );
};
