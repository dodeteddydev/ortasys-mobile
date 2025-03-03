import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { CountryService } from "../services/countryService";
import { CountryResponse } from "../types/countryResponseType";

export const useGetCountry = (enabled = true) =>
  useQuery<SuccessResponse<CountryResponse[]>, ErrorResponse>({
    queryKey: ["country"],
    queryFn: () => CountryService.get(),
    enabled,
  });
