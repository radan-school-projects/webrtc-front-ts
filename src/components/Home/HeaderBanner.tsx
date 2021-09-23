import React from "react";
import {
  Box,
  Text,
  Image,
} from "@chakra-ui/react";

import VideoChatImage from "../../assets/video-chat.svg";

const HeaderBanner = () => (
  <Box
    pos="relative"
    h="16rem"
    w="100vw"
    overflowX="hidden"
  >
    <Image
      src={VideoChatImage}
      w="58%"
      m="0 auto"
      pt="2rem"
    />
    <Text
      fontSize="1.5rem"
      fontWeight="semibold"
      color="#5564A9"
      textTransform="capitalize"
      pos="absolute"
      top="0"
      left="50%"
      transform="translateX(-78%)"
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
      color="#5564A9"
      pos="relative"
      left="50%"
    >
      On The Fly
    </Text>
  </Box>
);

export default HeaderBanner;
