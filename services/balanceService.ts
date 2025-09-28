import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";

export type BalanceResponse = {
  currentBalance: number;
  currencyCode: string;
  creditHotels: [];
};

export const getBalance = async () => {
  return await axiosInstance
    .get<SuccessResponse<BalanceResponse>>("agent/balance")
    .then((response) => response.data);
};
