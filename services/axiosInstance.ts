import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { Storage, StorageKey } from "@/utilities/secureStorage";
import axios, { AxiosError } from "axios";

const baseUrl = "https://appde.online/api/v1";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await Storage.getToken(StorageKey.accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: ErrorResponse) => {
    if (error.response?.status === 401) {
      try {
        const data = await getRefreshToken();
        if (!data) {
          await Storage.deleteToken(StorageKey.accessToken);
          await Storage.deleteToken(StorageKey.refreshToken);
          return Promise.reject(error);
        }

        await Storage.saveToken(StorageKey.accessToken, data.accessToken);
        await Storage.saveToken(StorageKey.refreshToken, data.refreshToken);

        if (error.config) {
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance.request(error.config);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
      }
    }
    return Promise.reject(error);
  }
);

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const getRefreshToken = async (): Promise<RefreshTokenResponse | undefined> => {
  try {
    const refreshToken = await Storage.getToken(StorageKey.refreshToken);
    if (!refreshToken) return;

    const response = await axios.post<SuccessResponse<RefreshTokenResponse>>(
      "/auth/refresh",
      { refreshToken: refreshToken }
    );

    return response.data.data;
  } catch (error) {
    console.log("Failed to refresh token:", error);
    return;
  }
};
