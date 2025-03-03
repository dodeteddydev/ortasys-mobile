import { axiosInstance } from "@/services/axiosInstance";
import { Storage, StorageKey } from "@/utilities/secureStorage";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getToken = async () => {
    const token = await Storage.getToken(StorageKey.accessToken);

    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const actionLogout = async () => {
    await Promise.all([
      Storage.deleteToken(StorageKey.accessToken),
      Storage.deleteToken(StorageKey.refreshToken),
    ]);
    setIsLoggedIn(false);
    router.replace("/");
  };

  const logout = () => {
    axiosInstance
      .post("auth/logout")
      .then(() => actionLogout())
      .catch(() => actionLogout())
      .finally(() => actionLogout());
  };

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
