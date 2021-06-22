import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../../contexts/user.context";
import { useWebRTC } from "../../contexts/webrtc.context";

const ChatBox = () => {
  const { friendname } = useUser();
  const localVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement | null>(null);
  // const { localStream, remoteStream } = useWebRTC();
  const {
    // streamRef,
    remoteStreamRef,
    localStreamRef,
    // remoteStream,
    // localStream,
  } = useWebRTC();

  React.useEffect(() => {
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;

    if (
      localVideo
      // && streamRef
      && localStreamRef
    ) {
      localVideo.srcObject = localStreamRef.current;
      // localVideo.srcObject = (localStreamRef as React.MutableRefObject<MediaStream>).current;
      // localVideo.srcObject = localStream;
      // localVideo.srcObject = streamRef.current.local;
    }

    if (
      remoteVideo
      // && streamRef
      && remoteStreamRef
    ) {
      // remoteVideo.srcObject = (remoteStreamRef as React.MutableRefObject<MediaStream>).current;
      remoteVideo.srcObject = remoteStreamRef.current;
      // remoteVideo.srcObject = remoteStream;
      // remoteVideo.srcObject = streamRef.current.remote;
    }
  }, [
    // streamRef,
    // streamRef?.current,
    // localVideoRef.current,
    // remoteVideoRef.current,
  ]);

  return (
    <Box>
      <Text>
        you will be chatting with&nbsp;
        <Box as="span" color="telegram.500">{friendname}</Box>
      </Text>
      {/* <Box id="remoteStream">
        remote stream here!
      </Box> */}
      <Flex>
        <Box>
          You
          <video autoPlay ref={localVideoRef} id="localStream">
            <track kind="captions" />
          </video>
        </Box>
        <Box>
          your friend
          <video autoPlay ref={remoteVideoRef} id="localStream">
            <track kind="captions" />
          </video>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChatBox;
