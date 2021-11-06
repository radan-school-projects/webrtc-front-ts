import { io } from "socket.io-client";
import { IResponse } from "../types";
import notifier from "./notifier";

// use local address IP for tests
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:3300";

const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false,
  withCredentials: true,
});

socket.onAny((event, ...args) => {
  let type: string | null = null;
  try {
    type = args[0].type;
  } finally {
    console.log(`${event}${type ? `:${type}` : ""}`, args);
  }
});

socket.on("connect_error", (error) => {
  console.error("connect_error", error.message);
  notifier.error({
    description: error.message,
  });
});

socket.on("response", (response: IResponse) => {
  if (response.type === "socket-connect") {
    notifier.success({
      description: response.content.description,
    });
  }
});

export default socket;
