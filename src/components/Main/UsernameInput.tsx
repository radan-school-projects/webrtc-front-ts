import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
} from "react";
import {
  Box, Button, Input,
} from "@chakra-ui/react";
import * as emitter from "../../utils/emitter";
import { IResponse } from "../../types";
import * as notifier from "../../utils/notifier";
import { useUser } from "../../contexts/user.context";
import { useSocket } from "../../contexts/socket.context";

const UsernameInput = () => {
  const { username, updateUsername } = useUser();
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

  const responseListener = (response: any) => {
    const { success, type, content } = response as IResponse;

    switch (type) {
      case "connect": {
        const { description } = content;
        if (success) {
          emitter.send(socket, {
            type: "login", // or register, whatever
            content: {
              username,
            },
          });
        } else {
          notifier.toast({
            status: "error",
            title: "couldn't connect",
            description,
          });
        }
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
    socket.on("response", responseListener);

    return () => {
      socket.off("response", responseListener);
    };
  }, [username]);

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
