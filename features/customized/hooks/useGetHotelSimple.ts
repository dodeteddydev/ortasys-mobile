import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { HotelSimpleService } from "../services/hotelSimpleService";
import { HotelSimpleResponse } from "../types/hotelSimpleResponse";
import { HotelSimpleQueryParams } from "../types/hotelSimpleQueryParams";

export const useGetHotelSimple = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: HotelSimpleQueryParams;
}) =>
  useQuery<SuccessResponse<HotelSimpleResponse[]>, ErrorResponse>({
    queryKey: ["hotel-simple", params],
    queryFn: () => HotelSimpleService.get(params),
    enabled,
  });
