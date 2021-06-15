import { io } from "socket.io-client";

// use local address IP for tests
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:3300";
const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false,
  withCredentials: true,
});

socket.onAny((event, ...args) => {
  const jsonArgs = args.map((arg) => {
    try {
      return JSON.parse(arg);
    } catch (err) {
      return arg;
    }
  });
  // eslint-disable-next-line no-console
  console.log(event, jsonArgs);
});

export default socket;
