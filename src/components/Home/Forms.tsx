import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";

interface OmittableFormProps {
  textOnTop?: string;
  textOnBottom?: string;
}

interface MandatoryFormProps {
  handleNameInputChange: React.ChangeEventHandler<HTMLInputElement>;
  buttonAction: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
}

interface FormTexts {
  title: string;
  buttonText: string;
}

type FormBaseProps = MandatoryFormProps & FormTexts & OmittableFormProps;

type FormProps = MandatoryFormProps & Partial<FormTexts> & OmittableFormProps;

export const FormBase = ({
  name,
  textOnTop,
  title,
  textOnBottom,
  buttonText,
  handleNameInputChange,
  buttonAction,
}: FormBaseProps) => (
  <Box
    w={{ base: "20.5rem", md: "36rem", lg: "24rem" }}
    m={{ base: "0 auto", lg: "0" }}
    // bgColor="blue.300"
  >
    <Text
      color="#7C85A7"
      fontSize={{ md: "1.2rem" }}
    >
      {textOnTop || ""}
      {/* Start by */}
    </Text>
    <Text
      fontSize={{ base: "2.3rem", md: "2.8rem" }}
      color="#F58E1F"
    >
      {title}
      {/* Sign In */}
    </Text>
    <Text
      color="#7C85A7"
      mt="-0.5rem"
      mb="1.1rem"
      fontSize={{ md: "1.2rem" }}
    >
      {textOnBottom || ""}
      {/* Choose an easy id */}
    </Text>
    <Input
      type="text"
      placeholder="username"
      value={name}
      onChange={handleNameInputChange}
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
      onClick={buttonAction}
      w="full"
      h="3.5rem"
      borderRadius="0.5rem"
      bgColor="#5564A9"
      color="white"
      _focus={{
        boxShadow: "0 0 0 2px rgba(85, 100, 169, 0.6)",
      }}
    >
      {buttonText}
      {/* Sign In */}
    </Button>
  </Box>
);

export const SignInForm = ({
  textOnTop,
  textOnBottom,
  title,
  buttonText,
  name,
  handleNameInputChange,
  buttonAction,
}: FormProps) => (
  <FormBase
    textOnTop={textOnTop || "Start By"}
    textOnBottom={textOnBottom || "Choose an easy id"}
    title={title || "Sign In"}
    buttonText={buttonText || "Sign In"}
    name={name}
    handleNameInputChange={handleNameInputChange}
    buttonAction={buttonAction}
  />
);

export const FriendNameForm = ({
  textOnTop,
  textOnBottom,
  title,
  buttonText,
  name,
  handleNameInputChange,
  buttonAction,
}: FormProps) => (
  <FormBase
    textOnTop={textOnTop || "Now"}
    textOnBottom={textOnBottom || "Or wait them to call you"}
    title={title || "Call People"}
    buttonText={buttonText || "Call"}
    name={name}
    handleNameInputChange={handleNameInputChange}
    buttonAction={buttonAction}
  />
);
