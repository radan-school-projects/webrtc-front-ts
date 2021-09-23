import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";

interface SignInProps {
  username: string;
  handleUsernameInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleRegisterBtnClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SigninForm = ({
  username,
  handleUsernameInputChange,
  handleRegisterBtnClick,
}: SignInProps) => (
  <Box
    w="20.5rem"
    m="0 auto"
  >
    <Text
      color="#7C85A7"
    >
      Start by
    </Text>
    <Text
      fontSize="2.3rem"
      color="#F58E1F"
      mb="1.1rem"
    >
      Sign In
    </Text>
    <Input
      type="text"
      placeholder="username"
      value={username}
      onChange={handleUsernameInputChange}
      color="#7C85A7"
      bgColor="#EEEFF7"
      border="0"
      h="3.5rem"
      borderRadius="0.5rem"
      _focus={{
        outline: "2px solid rgba(85, 100, 169, 0.6)",
        outlineOffset: "0",
        // boxShadow: "0 0 0 2px rgba(85, 100, 169, 0.6)",
      }}
      mb="1.1rem"
    />
    <Button
      onClick={handleRegisterBtnClick}
      w="full"
      h="3.5rem"
      borderRadius="0.5rem"
      bgColor="#5564A9"
      color="white"
      _focus={{
        boxShadow: "0 0 0 2px rgba(85, 100, 169, 0.6)",
      }}
    >
      Sign In
    </Button>
  </Box>
);

export default SigninForm;
