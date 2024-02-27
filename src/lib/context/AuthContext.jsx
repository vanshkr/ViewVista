import { createContext, useContext, useEffect, useState } from "react";
import { getAccount } from "../appwrite/api";
import { useNavigate } from "react-router-dom";

const DEFAULT_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: DEFAULT_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await getAccount();
      setIsAuthenticated(true);
      setUser({
        id: currentUser?.$id,
        name: currentUser?.name,
        username: currentUser?.username,
        email: currentUser?.email,
        imageUrl: currentUser?.imageURL,
        bio: currentUser?.bio,
      });
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookie = localStorage.getItem("cookieFallback");
    if (!cookie || cookie.length == 0) {
      navigate("/signIn");
    }
    checkAuthUser();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
