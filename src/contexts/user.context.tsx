import React, {
  createContext,
  ReactNode, useContext, useState,
} from "react";

interface UserContextValue {
  username: string;
  updateUsername: (username: string) => void;
}

const defaultUserContextValue: UserContextValue = {
  username: "",
  updateUsername: (): void => {},
};

const userContext = createContext<UserContextValue>(defaultUserContextValue);

export const useUser = () => useContext(userContext);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = useState<string>("");

  const updateUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const value = {
    username,
    updateUsername,
  };

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};
