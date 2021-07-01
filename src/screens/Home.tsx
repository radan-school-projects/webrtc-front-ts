import React from "react";
import {
  Box,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import socket from "../app/socket";

const Home = () => {
  const [username, setUsername] = React.useState<string>("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    socket.auth = { username };
    socket.connect();
  };

  return (
    <Box>
      <Text>
        Hello&nbsp;
        <Box as="span" color="telegram.500">
          {username}
        </Box>
      </Text>

      <Box>
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleInputChange}
        />
        <Button
          onClick={handleBtnClick}
        >
          Register
        </Button>
      </Box>

      {/* <Box>
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleInputChange}
        />
        <Button onClick={handleButtonClick}>Okay</Button>
      </Box> */}
    </Box>
  );
};

export default Home;
