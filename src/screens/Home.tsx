/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import {
  Box,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import socket from "../app/socket";
import emitter from "../app/emitter";
import { IResponse } from "../types";
import notifier from "../app/notifier";
import alert from "../app/alert";

const Home = ({ history }: RouteComponentProps) => {
  const [username, setUsername] = React.useState<string>("");
  const [friendname, setFriendname] = React.useState<string>("");

  const [callername, setCallername] = React.useState<string>("");

  const [isCalling, setIsCalling] = React.useState<boolean>(false);
  const [isCalled, setIsCalled] = React.useState<boolean>(false);

  const [isCallAccepted, setIsCallAccepted] = React.useState<boolean>(false);

  const handleUsernameInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleRegisterBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    socket.auth = { username };
    socket.connect();
  };

  const handleFriendnameInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setFriendname(e.target.value);
  };

  const onCancelDialing = () => {
    setIsCalling(false);
  };
  const onAcceptIncoming = () => {
    emitter.send(socket, {
      type: "call-answer",
      content: {
        caller: callername,

      },
    });
    setIsCallAccepted(true);
  };
  const onDenyIncoming = () => {

  };

  const handleCallBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!socket.connected) {
      notifier.error({
        description: "You should register first!",
      });
      return;
    }
    setIsCalling(true);
    emitter.send(socket, {
      type: "call-offer",
      content: {
        target: friendname,
      },
    });
  };

  const responseEventHandler = (response: IResponse) => {
    const { type, content, success } = response;

    switch (type) {
      case "call-offer":
        if (success) {
          setCallername(content.caller);
          setIsCalled(true);
        } else {
          setIsCalling(false);
          notifier.error({
            description: content.description,
          });
          alert.swalBootstrapBtn.close();
        }
        break;

      case "call-answer":
        if (success) {
          console.log(callername, username, friendname);
          alert.swalBootstrapBtn.close();
          setIsCalled(false);
          setIsCallAccepted(true);
        } else {
          notifier.error({
            description: content.description,
          });
        }
        break;

      default:
        break;
    }
  };
  React.useEffect(() => {
    socket.on("response", responseEventHandler);
    return () => {
      socket.off("response", responseEventHandler);
    };
  }, [

  ]);

  React.useEffect(() => {
    if (isCalling) {
      alert.dialingCall({
        partner: friendname,
        onCancel: onCancelDialing,
      });
    } else {
      // ? setIsCalling(false); will change nothing cause state is already false
    }
  }, [
    isCalling,
    setIsCalling,

  ]);
  React.useEffect(() => {
    if (isCalled) {
      alert.incomingCall({

        partner: callername,
        onAccept: onAcceptIncoming,
        onDeny: onDenyIncoming,
      });
    } else {
      // ? setIsCalled(false); will change nothing cause state is already false
    }
  }, [

    isCalled,
    setIsCalled,
  ]);

  React.useEffect(() => {
    if (isCallAccepted) {
      history.push("/room", { friendname, username });
    } else {
      setIsCallAccepted(false);
    }
  }, [
    isCallAccepted,
    setIsCallAccepted,
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
          onClick={handleRegisterBtnClick}
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
          onClick={handleCallBtnClick}
        >
          Call
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
