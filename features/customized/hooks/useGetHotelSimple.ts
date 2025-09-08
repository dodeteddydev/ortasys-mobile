import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { HotelSimpleService } from "../services/hotelSimpleService";
import { HotelSimpleResponse } from "../types/hotelSimpleResponse";

export type HotelSimpleQueryParams = {
  search?: string;
  country?: string;
  state?: string;
};

export const useGetHotelSimple = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: HotelSimpleQueryParams;
}) =>
  useQuery<SuccessResponse<HotelSimpleResponse[]>, ErrorResponse>({
    queryKey: ["HotelSimple", params],
    queryFn: () => HotelSimpleService.get(params),
    enabled,
  });
