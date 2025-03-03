import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { CityService } from "../services/cityService";
import { CityResponse } from "../types/cityResponseType";

export const useGetCity = ({
  enabled = true,
  countryCode,
  stateCode,
}: {
  enabled?: boolean;
  countryCode: string;
  stateCode: string;
}) =>
  useQuery<SuccessResponse<CityResponse[]>, ErrorResponse>({
    queryKey: ["city", countryCode, stateCode],
    queryFn: () => CityService.get(countryCode, stateCode),
    enabled,
  });
