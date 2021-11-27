import React from "react";
// import {
//   Box,
//   Text,
//   Input,
//   Button,
// } from "@chakra-ui/react";

// interface OmittableFormProps {
//   textOnTop?: string;
//   textOnBottom?: string;
// }

// interface MandatoryFormProps {
//   handleNameInputChange: React.ChangeEventHandler<HTMLInputElement>;
//   buttonAction: React.MouseEventHandler<HTMLButtonElement>;
//   name: string;
// }

// interface FormTexts {
//   title: string;
//   buttonText: string;
//   labelText?: string;
// }

// type FormBaseProps = MandatoryFormProps & FormTexts & OmittableFormProps;

// type FormProps = MandatoryFormProps & Partial<FormTexts> & OmittableFormProps;

// export const FormBase = ({
//   name,
//   textOnTop,
//   title,
//   textOnBottom,
//   buttonText,
//   handleNameInputChange,
//   buttonAction,
// }: FormBaseProps) => (
//   <Box
//     w={{ base: "20.5rem", md: "36rem", lg: "24rem" }}
//     m={{ base: "0 auto", lg: "0" }}
//     // bgColor="blue.300"
//   >
//     <Text
//       color="#7C85A7"
//       fontSize={{ md: "1.2rem" }}
//     >
//       {textOnTop || ""}
//       {/* Start by */}
//     </Text>
//     <Text
//       fontSize={{ base: "2.3rem", md: "2.8rem" }}
//       color="#F58E1F"
//     >
//       {title}
//       {/* Sign In */}
//     </Text>
//     <Text
//       color="#7C85A7"
//       mt="-0.5rem"
//       mb="1.1rem"
//       fontSize={{ md: "1.2rem" }}
//     >
//       {textOnBottom || ""}
//       {/* Choose an easy id */}
//     </Text>
//     <Input
//       type="text"
//       placeholder="username"
//       value={name}
//       onChange={handleNameInputChange}
//       color="#7C85A7"
//       bgColor="#EEEFF7"
//       border="0"
//       h="3.5rem"
//       borderRadius="0.5rem"
//       _focus={{
//         outline: "2px solid rgba(85, 100, 169, 0.6)",
//         outlineOffset: "0",
//         // boxShadow: "0 0 0 2px rgba(85, 100, 169, 0.6)",
//       }}
//       mb="1.1rem"
//     />
//     <Button
//       onClick={buttonAction}
//       w="full"
//       h="3.5rem"
//       borderRadius="0.5rem"
//       bgColor="#5564A9"
//       color="white"
//       _focus={{
//         boxShadow: "0 0 0 2px rgba(85, 100, 169, 0.6)",
//       }}
//     >
//       {buttonText}
//       {/* Sign In */}
//     </Button>
//   </Box>
// );

// export const SignInForm = ({
//   textOnTop,
//   textOnBottom,
//   title,
//   buttonText,
//   name,
//   handleNameInputChange,
//   buttonAction,
// }: FormProps) => (
//   <FormBase
//     textOnTop={textOnTop || "Start By"}
//     textOnBottom={textOnBottom || "Choose an easy id"}
//     title={title || "Sign In"}
//     buttonText={buttonText || "Sign In"}
//     name={name}
//     handleNameInputChange={handleNameInputChange}
//     buttonAction={buttonAction}
//   />
// );

// export const FriendNameForm = ({
//   textOnTop,
//   textOnBottom,
//   title,
//   buttonText,
//   name,
//   handleNameInputChange,
//   buttonAction,
// }: FormProps) => (
//   <FormBase
//     textOnTop={textOnTop || "Now"}
//     textOnBottom={textOnBottom || "Or wait them to call you"}
//     title={title || "Call People"}
//     buttonText={buttonText || "Call"}
//     name={name}
//     handleNameInputChange={handleNameInputChange}
//     buttonAction={buttonAction}
//   />
// );

export interface FormBaseProps {
  labelText: string;
  name: string;
  buttonText: string;
  placeholder: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  buttonAction: React.MouseEventHandler<HTMLButtonElement>;
}

export const FormBase = ({
  // name,
  // textOnTop,
  // title,
  // textOnBottom,
  labelText,
  name,
  buttonText,
  placeholder,
  handleInputChange,
  buttonAction,
}: FormBaseProps) => (
  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
        <div>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              {labelText}
              <div className="mt-1">
                <input onChange={handleInputChange} value={name} className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" type="text" name="username" placeholder={placeholder} id="userId" />
              </div>
            </label>
          </div>
        </div>

        <div>
          <button onClick={buttonAction} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{buttonText}</button>
        </div>
      </form>
    </div>
  </div>
);
