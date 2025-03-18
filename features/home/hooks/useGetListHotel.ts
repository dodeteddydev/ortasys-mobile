import { useQuery } from "@tanstack/react-query";
import { ListHotelParams } from "../types/lisHotelParamsType";
import { HomeService } from "../services/homeService";
import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { ListHotelResponse } from "../types/lisHotelResponseType";

export const useGetListHotel = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params: ListHotelParams;
}) =>
  useQuery<SuccessResponse<ListHotelResponse[]>, ErrorResponse>({
    queryKey: ["list-hotel", params],
    queryFn: () => HomeService.getListHotel(params),
    enabled,
  });
