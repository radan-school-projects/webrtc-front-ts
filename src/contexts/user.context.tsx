import React, {
  createContext,
  ReactNode, useContext, useState,
} from "react";

interface UserContextValue {
  username: string | null;
  updateUsername: (username: string | null) => void;
}

const defaultUserContextValue: UserContextValue = {
  username: null,
  updateUsername: (): void => {},
};

const userContext = createContext<UserContextValue>(defaultUserContextValue);

export const useUser = () => useContext(userContext);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = useState<string | null>("");

  const updateUsername = (newUsername: string | null) => {
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
