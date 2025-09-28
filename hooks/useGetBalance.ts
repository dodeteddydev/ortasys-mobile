import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { getBalance, BalanceResponse } from "../services/balanceService";

export const useGetBalance = (enabled = true) =>
  useQuery<SuccessResponse<BalanceResponse>, ErrorResponse>({
    queryKey: ["balance"],
    queryFn: getBalance,
    enabled,
  });
