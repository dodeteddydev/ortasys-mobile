import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { RoomSimpleService } from "../services/roomSimpleService";
import { RoomSimpleResponse } from "../types/roomSimpleResponse";
import { RoomSimpleQueryParams } from "../types/roomSimpleQueryParams";

export const useGetRoomSimple = ({
  enabled = true,
  hotelId,
  params,
}: {
  enabled?: boolean;
  hotelId: number;
  params?: RoomSimpleQueryParams;
}) =>
  useQuery<SuccessResponse<RoomSimpleResponse[]>, ErrorResponse>({
    queryKey: ["room-simple", hotelId, params],
    queryFn: () => RoomSimpleService.get(hotelId, params),
    enabled,
  });
