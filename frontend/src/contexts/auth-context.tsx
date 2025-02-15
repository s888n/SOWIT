import { createContext, useState, useEffect, useContext} from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface User {
  id: string;
  avatar: string;
  username: string;
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  getUser: () => void;
  loginUser: (username: string, password: string) => void;
  registerUser: (username: string, password: string, password2: string) => void;
  logoutUser: () => void;
  loginWithGithub: (code: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/user/");
        console.log(response)
        if (response.status === 200) {  // Or another suitable success code
          setIsAuthenticated(true);
          // setUser(response.data);
        } else {
            throw new Error('Failed to authenticate');
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const loginUser = async (username: string, password: string) => {
    const response = await api.post("/login/", { username, password });
    if (response.status === 200) {
      setIsAuthenticated(true);
      setUser(response.data);
    }
  };
  const registerUser = async (
    username: string,
    password: string,
    password2: string
  ) => {
    const response = await api.post("/register/", {
      username,
      password,
      password2,
    });
    if (response.status === 201) {
      setIsAuthenticated(true);
      setUser(response.data);
    }
  };

  const loginWithGithub = async (code: string) => {
    const response = await api.post("/github/", { code });
    if (response.status === 200) {
      setIsAuthenticated(true);
      setUser(response.data);
    }
  }

  const logoutUser = async () => {
    const response = await api.post("/logout/");
    if (response.status === 200) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const getUser = async () => {
    const response = await api.get("/user/");
    if (response.status === 200) {
      setUser(response.data);
    }
  };

  // const refreshToken = async () => {
  //   return getAPI("/refresh/");
  // };
  const contextData = {
    isAuthenticated,
    user,
    loginUser,
    registerUser,
    logoutUser,
    loading,
    setLoading,
    loginWithGithub,
    getUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
