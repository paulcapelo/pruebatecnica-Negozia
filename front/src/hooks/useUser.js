import { useContext } from "react";
import { useAuth, userContext } from "../context/useContext";
import useSWR from "swr";
import { UserInfo } from "../models";
import { url } from '../services'
export const useUser = () => {
  const { user, setUser } = useAuth();

  const login = async ({ email, password }) => {
    const user = await fetch(`${url}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
    localStorage.setItem("data-user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    setUser(UserInfo);
    localStorage.setItem("data-user", JSON.stringify(UserInfo));
  };

  return {
    user,
    mutate: login,
    logout,
  };
};
