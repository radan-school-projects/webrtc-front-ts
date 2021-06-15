import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import {
  Box, Button, Input,
} from "@chakra-ui/react";
import socket from "../../app/socket";
import * as emitter from "../../utils/emitter";
import { IResponse } from "../../types";
import * as notifier from "../../utils/notifier";

const UsernameInput = () => {
  const [username, setUsername] = useState<string>("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handleButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();

    // create a socket connection
    socket.auth = { username };
    socket.connect();

    // set current socket ref
    // socketRef.current = socket

    // login
    if (socket.connected) {
      emitter.send(socket, {
        type: "login",
        content: {
          username,
        },
      });
    }
  };

  useEffect(() => {
    socket.on("response", (response) => {
      const { success, type, content } = response as IResponse;

      switch (type) {
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
    });

    return () => {
      socket.off("response");
    };
  }, []);

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
