import React from "react";
import {
  Box,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import socket from "../app/socket";

const Home = ({ history }: RouteComponentProps) => {
  const [username, setUsername] = React.useState<string>("");
  const [friendname, setFriendname] = React.useState<string>("");
  const [isCalling, setIsCalling] = React.useState<boolean>(false);

  const handleUsernameInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleUsernameBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    socket.auth = { username };
    socket.connect();
  };

  const handleFriendnameInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setFriendname(e.target.value);
  };

  const handleFriendnameBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsCalling(true);
  };

  React.useEffect(() => {
    if (isCalling && socket.connected && username && friendname) {
      history.push("/room", { friendname, username });
    } else {
      setIsCalling(false);
    }
  }, [
    isCalling,
  ]);

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
          onChange={handleUsernameInputChange}
        />
        <Button
          onClick={handleUsernameBtnClick}
        >
          Register
        </Button>
      </Box>

      <Box>
        <Input
          type="text"
          placeholder="friendname"
          value={friendname}
          onChange={handleFriendnameInputChange}
        />
        <Button
          onClick={handleFriendnameBtnClick}
        >
          Call
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
