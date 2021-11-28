/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";
import { uniqueNamesGenerator } from "unique-names-generator";

import emitter from "../app/emitter";
import { IResponse } from "../types";
import notifier from "../app/notifier";
import alert from "../app/alert";
import { useUser } from "../contexts/user.context";
import { useSocket } from "../contexts/socket.context";
import { FormBase } from "../components/Home/Forms";
import { customConfig } from "../app/namegenerator";

const Home = ({ history }: RouteComponentProps) => {
  const { socket } = useSocket();

  const {
    username, friendname, updateUsername: setUsername, updateFriendname: setFriendname,
  } = useUser();

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
    setFriendname(callername);// +++
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
    setFriendname("");//+++
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
      history.replace("/room", {
        isCaller: !!isCalling,
      });
    } else {
      // setIsCallAccepted(false); // ? useless
    }
  }, [
    isCallAccepted,
    setIsCallAccepted,
  ]);

  const generateUsername = () => {
    const randomName: string = uniqueNamesGenerator(customConfig);
    setUsername(randomName);
  };

  return (
    <>
      <Helmet>
        <title>ChatSignal Home</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="/images/webrtc_logo.svg" alt="webrtc chat" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {(!!socketConnected && !!username)
              ? (
                <>
                  Hi&nbsp;
                  <span className="text-indigo-500">{username}</span>
                </>
              )
              : "Set a username"}
          </h2>
          {(!!socketConnected && !!username) ? <p className="text-center text-sm font-medium text-gray-700">Try to call someone or wait them to call you</p> : null}
        </div>

        {(!!socketConnected && !!username)
          ? (
            <FormBase
              name={friendname}
              handleInputChange={handleFriendnameInputChange}
              buttonAction={handleCallBtnClick}
              buttonText="Call"
              labelText="Friend username"
              placeholder="e.g. pepsicola"
              isUserForm={false}
            />
          )
          : (
            <FormBase
              name={username}
              handleInputChange={handleUsernameInputChange}
              buttonAction={handleRegisterBtnClick}
              buttonText="Continue"
              labelText="Username"
              placeholder="e.g. cocacola"
              isUserForm
              generateUsername={generateUsername}
            />
          )}

      </div>
    </>
  );
};

export default Home;
