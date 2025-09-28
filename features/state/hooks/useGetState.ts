import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { StateService } from "../services/stateService";
import { StateResponse } from "../types/stateResponse";

export const useGetState = ({
  enabled = true,
  countryCode,
}: {
  enabled?: boolean;
  countryCode: string;
}) =>
  useQuery<SuccessResponse<StateResponse[]>, ErrorResponse>({
    queryKey: ["state", countryCode],
    queryFn: () => StateService.get(countryCode),
    enabled,
  });
