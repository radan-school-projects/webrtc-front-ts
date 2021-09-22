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
    h="268px"
  >
    <Image
      src={VideoChatImage}
      w="58%"
      m="0 auto"
    />
    <Text
      fontSize="1.5rem"
      color="#5564A9"
      textTransform="capitalize"
      pos="absolute"
      top="0"
      left="0"
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
      color="#5564A9"
      pos="absolute"
      // right="0"
    >
      On The Fly
    </Text>
  </Box>
);

export default HeaderBanner;
