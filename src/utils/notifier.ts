import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const defaultOptions: UseToastOptions = {
  isClosable: true,
  duration: 5000,
  position: "top",
};
// eslint-disable-next-line import/prefer-default-export
export const toast = createStandaloneToast({ defaultOptions });
