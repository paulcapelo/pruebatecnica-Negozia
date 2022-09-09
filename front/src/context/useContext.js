import { useState, useContext, createContext } from "react";
import { UserInfo } from "../models";

const UserContext = createContext(UserInfo);

export const AuthProvider = ({ children, user:usere }) => {
  const [user, setUser] = useState(usere);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
