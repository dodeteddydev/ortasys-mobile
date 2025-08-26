import { accessTokenKey, refreshTokenKey } from "@/constants/storageKey";
import { ProfileService } from "@/features/profile/services/profileService";
import { ProfileResponse } from "@/features/profile/types/profileResponseType";
import { axiosInstance } from "@/services/axiosInstance";
import { ErrorResponse } from "@/types/responseType";
import { Storage } from "@/utilities/secureStorage";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

type GlobalContextType = {
  isLoadingProfile: boolean;
  getProfile: () => void;
  dataProfile: ProfileResponse | null;
  isLoggedIn: boolean;
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
  const [dataProfile, setDataProfile] = useState<ProfileResponse | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkUserRole = (response: ProfileResponse) => {
    if (response.role !== "agent")
      return Alert.alert("Access Denied", "Only agents can access this app.", [
        { text: "Logout", onPress: logout },
      ]);
  };

  const checkError = (e: ErrorResponse) => {
    if (e.response?.status === 401)
      return Alert.alert("Session Expired", "Please login again", [
        { text: "OK", onPress: logout },
      ]);
  };

  const getProfile = () => {
    setIsLoadingProfile(true);
    ProfileService.get()
      .then((response) => {
        checkUserRole(response.data);
        setDataProfile(response.data);
      })
      .catch((e: ErrorResponse) => checkError(e))
      .finally(() => setIsLoadingProfile(false));
  };

  const getToken = () => {
    const token = Storage.getToken(accessTokenKey);

    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const actionLogout = async () => {
    Storage.deleteToken(accessTokenKey),
      Storage.deleteToken(refreshTokenKey),
      setIsLoggedIn(false);
    router.replace("/");
  };

  const logout = () => {
    axiosInstance.post("auth/logout").finally(() => actionLogout());
  };

  return (
    <GlobalContext.Provider
      value={{ isLoadingProfile, getProfile, dataProfile, isLoggedIn, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
