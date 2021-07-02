import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const genericDefaultOptions: UseToastOptions = {
  isClosable: true,
  duration: 5000,
  position: "top",
};
const errorOptions: UseToastOptions = {
  status: "error",
  title: "Oops",
};
const successOptions: UseToastOptions = {
  status: "success",
  title: "Success!!",
};

const toast = createStandaloneToast({ defaultOptions: genericDefaultOptions });

const error = createStandaloneToast({
  defaultOptions: { ...genericDefaultOptions, ...errorOptions },
});

const success = createStandaloneToast({
  defaultOptions: { ...genericDefaultOptions, ...successOptions },
});

export default { toast, error, success };
