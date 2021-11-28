import React, {
  createContext,
  ReactNode, useContext, useState,
} from "react";

interface UserContextValue {
  username: string;
  updateUsername: (username: string) => void;
  friendname: string;
  updateFriendname: (friendname: string) => void;
}

const defaultUserContextValue: UserContextValue = {
  username: "",
  updateUsername: (): void => {},
  friendname: "",
  updateFriendname: (): void => {},
};

const userContext = createContext<UserContextValue>(defaultUserContextValue);

export const useUser = () => useContext(userContext);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = useState<string>("");
  const [friendname, setFriendname] = useState<string>("");

  // React.useEffect(() => {
  //   console.log(username);
  // }, [username]);

  // React.useEffect(() => {
  //   console.log(friendname);
  // }, [friendname]);

  const updateUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const updateFriendname = (newFriendname: string) => {
    setFriendname(newFriendname);
  };

  const value = {
    username,
    updateUsername,
    friendname,
    updateFriendname,
  };

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};
