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
    const refreshToken = await Storage.getToken(StorageKey.refreshToken);

    if (refreshToken && error.response?.status === 401) {
      try {
        const { data } = await axios.post<
          SuccessResponse<RefreshTokenResponse>
        >(`${baseUrl}/auth/refresh`, { refreshToken: refreshToken });

        await Storage.saveToken(StorageKey.accessToken, data.data.accessToken);
        await Storage.saveToken(
          StorageKey.refreshToken,
          data.data.refreshToken
        );
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
