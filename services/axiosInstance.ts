import { accessTokenKey, refreshTokenKey } from "@/constants/storageKey";
import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { Storage } from "@/utilities/secureStorage";
import axios from "axios";
import Constants from "expo-constants";

const baseApiUrl = Constants.expoConfig?.extra?.BASE_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Storage.getToken(accessTokenKey);

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: ErrorResponse) => {
    const refreshToken = Storage.getToken(refreshTokenKey);

    if (refreshToken && error.response?.status === 401) {
      try {
        const authRefresh = await axios.post<
          SuccessResponse<RefreshTokenResponse>
        >(`${baseApiUrl}/auth/refresh`, { refreshToken: refreshToken });

        const data = authRefresh.data.data;

        Storage.saveToken(accessTokenKey, data.accessToken);
        Storage.saveToken(refreshTokenKey, data.refreshToken);
      } catch (err) {
        const errAxios = err as ErrorResponse;
        return Promise.reject(errAxios);
      }
    }
    return Promise.reject(error);
  }
);

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
