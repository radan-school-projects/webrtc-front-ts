/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import {
  Box,
  Flex,
  Container,
  // Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";

import socket from "../app/socket";
import emitter from "../app/emitter";
import { IResponse } from "../types";
import notifier from "../app/notifier";
import alert from "../app/alert";
import HeaderBanner from "../components/Home/HeaderBanner";
import { SignInForm, FriendNameForm } from "../components/Home/Forms";
import ColorModeSwitcher from "../components/ColorModeSwitcher";

const Home = ({ history }: RouteComponentProps) => {
  const [username, setUsername] = React.useState<string>("");
  const [friendname, setFriendname] = React.useState<string>("");

  const [callername, setCallername] = React.useState<string>("");

  const [isCalling, setIsCalling] = React.useState<boolean>(false);
  const [isCalled, setIsCalled] = React.useState<boolean>(false);

  const [isCallAccepted, setIsCallAccepted] = React.useState<boolean>(false);

  const [socketConnected, setSocketConnected] = React.useState<boolean>(socket.connected);

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
    emitter.send(socket, {
      type: "call-offer",
      content: {
        target: friendname,
        cancelling: true,
      },
    });
    setIsCalling(false);
    // setFriendname("");
  };
  const onAcceptIncoming = () => {
    emitter.send(socket, {
      type: "call-answer",
      content: {
        caller: callername,
        accepted: true,
      },
    });
    setIsCallAccepted(true);
  };
  const onDenyIncoming = () => {
    emitter.send(socket, {
      type: "call-answer",
      content: {
        caller: callername,
        accepted: false,
      },
    });
    setCallername("");
    setIsCallAccepted(false);
    setIsCalled(false);
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
      case "socket-connect":
        // if (success) {
        //   setSocketConnected(true);
        // } else {
        //   setSocketConnected(false);
        // }
        setSocketConnected(success);
        break;
      case "call-offer":
        if (success) {
          // setCallername(content.caller);
          // setIsCalled(true);
          if (!content.cancelling) {
            setCallername(content.caller);
            setIsCalled(true);
          } else {
            setCallername("");
            setIsCalled(false);
            alert.swalBootstrapBtn.close();
          }
        } else {
          setIsCalling(false);
          // setIsCalled(true);
          notifier.error({
            description: content.description,
          });
          alert.swalBootstrapBtn.close();
        }
        break;

      case "call-answer":
        if (success) {
          alert.swalBootstrapBtn.close();
          setIsCalled(false);
          // wbehter our friend accepted our call or not
          setIsCallAccepted(content.accepted);
          setIsCalling(false);
        } else {
          // if an error occured while calling
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
    // setSocketConnected(false);
    // setUsername("");
    // setFriendname("alefa");
    // setIsCalling(false);
    // setCallername("borodin");
    // setIsCalled(true);
    // setUsername("");
    socket.on("response", responseEventHandler);
    return () => {
      socket.off("response", responseEventHandler);
    };
  }, [

  ]);

  React.useEffect(() => {
    if (isCalling) {
      alert.dialingCall({
        partner: friendname /* "RadanyBe" */,
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
        partner: callername /* "RadanyBe" */,
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
      history.push("/room", {
        friendname: isCalling ? friendname : callername,
        username,
        isCaller: !!isCalling,
      });
    } else {
      // setIsCallAccepted(false); // ? useless
    }
  }, [
    isCallAccepted,
    setIsCallAccepted,
  ]);

  return (
    <Flex
      bgColor="#f6f6f6"
      h="100vh"
      // minH="100vh"
      flexDir="column"
      overflowX="hidden"
    >
      {/* AppBar */}
      <Box
        boxShadow="0px 2px 4px rgba(100,100,100,0.5)"
      >
        <Container
          maxW="container.lg"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            h="3.6rem"
          >
            {/* Logo */}
            <Box
              fontSize="1.6rem"
              fontWeight="bold"
            >
              W
            </Box>

            {/* Menu */}
            <Box>
              <ColorModeSwitcher />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box
        flexGrow={1}
      >
        <Box
          // maxW="container.lg"
          position="relative"
          top="50%"
          transform="translateY(-50%)"
          display={{ lg: "flex" }}
          justifyContent={{ lg: "space-between" }}
          alignItems={{ lg: "center" }}
          maxW={{ lg: "container.lg" }}
          m={{ lg: "0 auto" }}
          // bgColor="red.400"
        >
          {/* Static Banner */}
          <HeaderBanner
            username={socketConnected ? username : ""}
          />

          <Box
            maxW={{ base: "container.lg", lg: "unset" }}
            // w={{ lg: "40%" }}
          >
            {(!socketConnected)
              ? (
                <SignInForm
                  name={username}
                  handleNameInputChange={handleUsernameInputChange}
                  buttonAction={handleRegisterBtnClick}
                />
              )
              : (
                <FriendNameForm
                  name={friendname}
                  handleNameInputChange={handleFriendnameInputChange}
                  buttonAction={handleCallBtnClick}
                />
              )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
