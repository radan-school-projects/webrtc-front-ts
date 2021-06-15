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
import socket from "../../app/socket";
import * as emitter from "../../utils/emitter";
import { IResponse } from "../../types";
import * as notifier from "../../utils/notifier";
import { useUser } from "../../contexts/user.context";

const UsernameInput = () => {
  // const [username, setUsername] = useState<string>("");
  const { username, updateUsername } = useUser();
  // const socketRef = useRef(socket);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateUsername(e.target.value);
  };

  const handleButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();

    // create a socket connection
    socket.auth = { username };
    socket.connect();
  };

  useEffect(() => {
    socket.on("response", (response) => {
      const { success, type, content } = response as IResponse;

      switch (type) {
        case "connect": {
          const { connected } = content;
          if (connected) {
            emitter.send(socket, {
              type: "login", // or register, whatever
              content: {
                username,
              },
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
    });

    return () => {
      socket.off("response");
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
