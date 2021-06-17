import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  // useRef,
  // useState,
} from "react";
import {
  Box, Button, Input,
} from "@chakra-ui/react";
// import socket from "../../app/socket";
import * as emitter from "../../utils/emitter";
import { IResponse } from "../../types";
import * as notifier from "../../utils/notifier";
import { useUser } from "../../contexts/user.context";
import { useSocket } from "../../contexts/socket.context";

const UsernameInput = () => {
  // const [username, setUsername] = useState<string>("");
  const { username, updateUsername } = useUser();
  // const socketRef = useRef(socket);
  const { socket } = useSocket();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateUsername(e.target.value);
  };

  const handleButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();

    // create a socket connection
    socket.auth = { username };
    socket.connect();
  };

  const responseListener = (response: IResponse) => {
    // const { success, type, content } = response as IResponse;
    const { success, type, content } = response;

    switch (type) {
      // case "connect": {
      //   const { connected } = content;
      //   if (connected) {
      //     emitter.send(socket, {
      //       type: "login", // or register, whatever
      //       content: {
      //         username,
      //       },
      //     });
      //   }
      // }
      //   break;

      case "connect":
        if (socket.connected) {
          emitter.send(socket, {
            type: "login", // or register, whatever
            content: {
              username,
            },
          });
        }
        break;

      case "login": {
        const { description } = content;
        if (!success) {
          notifier.toast({
            title: "Couldn't login",
            description,
            status: "error",
          });
        } else {
          notifier.toast({
            title: "Logged in",
            description,
            status: "success",
          });
        }
      }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    socket.once("response", responseListener);

    return () => {
      socket.off("response", responseListener);
    };
  }, [username/* , connected */]);

  return (
    <Box>
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>Okay</Button>
    </Box>
  );
};

export default UsernameInput;
