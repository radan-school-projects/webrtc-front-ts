import React from "react";
import {
  Box,
  Text,
  Image,
  ChakraComponent,
  ChakraProps,
} from "@chakra-ui/react";

import VideoChatImage from "../../assets/video-chat.svg";

type HeaderBannerProps = ChakraProps & { username: string }

const HeaderBanner: ChakraComponent<typeof Box, HeaderBannerProps> = (
  { username, ...rest }: HeaderBannerProps,
) => (
  <Box
    pos="relative"
    w={{ base: "fill", md: "36rem", lg: "32rem" }}
    px={{ base: "0.1rem", md: "0.5rem", lg: "0" }}
    m={{ base: "0 auto", lg: "0" }}
    display={{ md: "flex" }}
    flexDir={{ md: "row-reverse" }}
    // bgColor="green.300"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    <Box
      w={{ base: "14rem", md: "18.6rem", lg: "22rem" }}
      m={{ base: "0 auto", md: "0" }}
      pos="relative"
      mt={{ lg: "3rem" }}
    >
      <Box
        w={{ base: "14rem", md: "18.6rem", lg: "22rem" }}
        h={{ base: "14rem", md: "18.6rem", lg: "22rem" }}
        m="0 auto"
        bgColor="#EBEDF6"
        borderRadius="16rem"
      />
      <Image
        src={VideoChatImage}
        w="100%"
        // w="14rem"
        m="0 auto"
        pos="absolute"
        top="50%"
        transform="translateY(-50%)"
        mt="0.5rem"
      />
    </Box>
    <Text
      fontSize={{ base: "1.5rem", md: "2.2rem", lg: "3rem" }}
      fontWeight={{ base: "semibold", md: "normal" }}
      color="#5564A9"
      textTransform="capitalize"
      pos="absolute"
      top={{ base: "0" }}
      left={{ base: "50%", md: "0" }}
      mt={{ base: "-0.5rem", md: "2rem" }}
      transform={{ base: "translateX(-78%)", md: "none" }}
      visibility={!username ? "visible" : "hidden"}
    >
      Chat with your
      &nbsp;
      <br />
      <Box
        as="span"
        color="#F58E1F"
      >
        friends
      </Box>
    </Text>
    <Text
      fontSize={{ base: "1.5rem", md: "2.2rem", lg: "3rem" }}
      fontWeight={{ base: "semibold", md: "normal" }}
      // color="#5564A9"
      color="#7C85A7"
      w={{ base: "full", md: "fit-content" }}
      textAlign={{ base: "center", md: "left" }}
      visibility={username ? "visible" : "hidden"}
      position="absolute"
      top="0"
      left={{ md: "0" }}
      mt={{ base: "-0.5rem", md: "2rem" }}
    >
      {/* {`hi @${username}`} */}
      Hi&nbsp;
      <Box as="br" display={{ base: "none", md: "block", lg: "none" }} />
      @
      {username}
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
