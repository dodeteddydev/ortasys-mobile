import { AxiosError } from "axios";

export type ApiResponse<T> = {
  message: string;
  data: T;
  error: { key: string; value: string }[] | null;
};

export type PaginationResponse<T> = {
  totalRecords: 5;
  totalPages: 1;
  page: 1;
  limit: 10;
  data: T[];
};

export type SuccessResponse<T> = ApiResponse<T>;
export type ErrorResponse = AxiosError<ApiResponse<boolean>>;
