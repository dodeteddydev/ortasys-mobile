import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../services/bookingService";
import { BookingHotelRoomQueryParams } from "../types/bookingHotelRoomQueryParams";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";

export const useGetBookingHotelRoom = ({
  enabled = true,
  roomId,
  params,
}: {
  enabled?: boolean;
  roomId: number;
  params?: BookingHotelRoomQueryParams;
}) =>
  useQuery<SuccessResponse<BookingHotelRoomResponse>, ErrorResponse>({
    queryKey: ["booking-room", roomId, params],
    queryFn: () => BookingService.getHotelRoom(roomId, params),
    enabled,
  });
