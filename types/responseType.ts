import { AxiosError } from "axios";

export type ApiResponse<T> = {
  message: string;
  data: T;
  error: { key: string; value: string }[] | null;
};

export type SuccessResponse<T> = ApiResponse<T>;
export type ErrorResponse = AxiosError<ApiResponse<boolean>>;
