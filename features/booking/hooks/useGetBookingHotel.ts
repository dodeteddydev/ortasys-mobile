import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../services/bookingService";
import { BookingHotelQueryParams } from "../types/bookingHotelQueryParams";
import { BookingHotelResponse } from "../types/bookingHoteResponse";

export const useGetBookingHotel = ({
  enabled = true,
  hotelId,
  params,
}: {
  enabled?: boolean;
  hotelId: number;
  params?: BookingHotelQueryParams;
}) =>
  useQuery<SuccessResponse<BookingHotelResponse[]>, ErrorResponse>({
    queryKey: ["booking-hotel", hotelId, params],
    queryFn: () => BookingService.getHotel(hotelId, params),
    enabled,
  });
