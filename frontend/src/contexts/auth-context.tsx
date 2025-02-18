import React, { createContext, useState, useEffect, useContext } from "react";
import { API_URL } from "@/lib/constants";

export type User = {
  id: string;
  avatar: string;
  username: string;
};

export type AuthContextType = {
  auth: {
    loading: boolean;
    user: User | null;
  };
  setAuth: (auth: any) => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState({ user: null, loading: true });
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/user/`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAuth({ user: data, loading: false });
        } else {
          throw new Error("Failed to authenticate");
        }
      } catch (error) {
        setAuth({ user: null, loading: false });
        console.error(error);
      }
    };

    checkAuthStatus();
  }, []);



  // const githubLogin = async (code) => {
  //   try {
  //     const response = await fetch(`${API_URL}/auth/github/login/`, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       window.location.href = `${API_URL}/auth/github/login/`;
  //     } else {
  //       throw new Error("Failed to authenticate");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const contextData = { auth, setAuth };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
