import { Socket } from "socket.io-client";
import { ICommand } from "../types";

export const send = (socket: Socket, command: ICommand) => {
  socket.emit("command", command);
};

export default { send };
