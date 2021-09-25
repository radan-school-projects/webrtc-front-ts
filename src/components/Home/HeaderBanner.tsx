import React from "react";
import {
  Box,
  Text,
  Image,
} from "@chakra-ui/react";

import VideoChatImage from "../../assets/video-chat.svg";

const HeaderBanner = ({ username }: { username: string }) => (
  <Box
    pos="relative"
    // minH="16rem"
    w="fill"
    m="0 auto"
    // overflowX="hidden"
  >
    <Box
      w="14rem"
      m="0 auto"
      pos="relative"
    >
      <Box
        w="14rem"
        h="14rem"
        m="0 auto"
        bgColor="#EBEDF6"
        borderRadius="16rem"
      />
      <Image
        src={VideoChatImage}
        w="100%"
        pos="absolute"
        top="50%"
        transform="translateY(-50%)"
        mt="0.5rem"
      />
    </Box>
    <Text
      fontSize="1.5rem"
      fontWeight="semibold"
      color="#5564A9"
      textTransform="capitalize"
      pos="absolute"
      top="0"
      left="50%"
      transform="translateX(-78%)"
      visibility={!username ? "visible" : "hidden"}
    >
      Chat with your&nbsp;
      <br />
      <Box
        as="span"
        color="#F58E1F"
      >
        friends
      </Box>
    </Text>
    <Text
      fontSize="1.5rem"
      fontWeight="semibold"
      // color="#5564A9"
      color="#7C85A7"
      w="full"
      textAlign="center"
      visibility={username ? "visible" : "hidden"}
      position="absolute"
      top="0"
      // mt="-2rem"
    >
      {`hi @${username}`}
      {/* Hi&nbsp;
      @
      <Box
        as="span"
        color="#F58E1F"
      >
        {username}
      </Box> */}
    </Text>
  </Box>
);

export default HeaderBanner;
