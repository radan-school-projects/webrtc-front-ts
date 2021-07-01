import { Socket } from "socket.io-client";
import { ICommand } from "../types";

// eslint-disable-next-line import/prefer-default-export
export const send = (socket: Socket, command: ICommand) => {
  socket.emit("command", command);
};

// export const sendTo = (emitter: Socket, receiverId: string, response: IResponse) => {
//   emitter.to(receiverId).emit("response", response);
// };

// export const broadcast = (emitter: Socket, response: IResponse) => {
//   emitter.broadcast.emit("response", response);
// };

export default { send };
