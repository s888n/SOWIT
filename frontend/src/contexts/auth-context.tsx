import { createContext, useState, useEffect, useContext } from "react";
import { getAPI,postAPI } from "@/api/axios";
interface User {
  id: string;
  avatar: string;
  name: string;
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (username: string, password: string) => void;
  register: (username: string, password: string, password2: string) => void;
  logout: () => void;
  getUser: () => void;
  refreshToken: () => void;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // the token are stored in the cookie so no need to store it in the state and are handled by the backend

  const login = async (username: string, password: string) => {
    return postAPI("/login/", { username, password });
  };

  const register = async (username : string, password: string, password2: string) => {
    return postAPI("/register/", { username, password, password2 });
  }

  const logout = async () => {
    const response = await postAPI("/logout/",{});
    if (response.status === 200) {
      setIsAuthenticated(false);
      setUser(null);
      // navigate("/auth");
    }

  }
  const getUser = async () => {
    const response = await getAPI("/user/");
    if (response.status === 200) {
      setUser(response.data);
    }
  }

  const refreshToken = async () => {
    return getAPI("/refresh/");
  }

  useEffect(() => {
    const checkAuth = async () => {
      const response = await getAPI("/user/");
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data);
      }
      setLoading(false);
    };
    checkAuth();
  }
  , [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
        getUser,
        refreshToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
