import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { ContractService } from "../services/contractService";
import { ContractResponse } from "../types/contractResponse";
import { ContractQueryParams } from "../types/contractQueryParams";

export const useGetContract = ({
  enabled = true,
  roomId,
  params,
}: {
  enabled?: boolean;
  roomId: number;
  params?: ContractQueryParams;
}) =>
  useQuery<SuccessResponse<ContractResponse[]>, ErrorResponse>({
    queryKey: ["contract", roomId, params],
    queryFn: () => ContractService.get(roomId, params),
    enabled,
  });
