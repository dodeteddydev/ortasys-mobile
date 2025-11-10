import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../services/bookingService";
import { BookingHotelRoomQueryParams } from "../types/bookingHotelRoomQueryParams";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";

export const useGetBookingHotelRoom = ({
  enabled = true,
  hotelRoomId,
  params,
}: {
  enabled?: boolean;
  hotelRoomId: number;
  params?: BookingHotelRoomQueryParams;
}) =>
  useQuery<SuccessResponse<BookingHotelRoomResponse>, ErrorResponse>({
    queryKey: ["booking-hotel-room", hotelRoomId, params],
    queryFn: () => BookingService.getHotelRoom(hotelRoomId, params),
    enabled,
  });
