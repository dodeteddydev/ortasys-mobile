import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../services/bookingService";
import { BookingListQueryParams } from "../types/bookingListQueryParams";
import { BookingListResponse } from "../types/bookingListResponse";

export const useGetBookingList = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: BookingListQueryParams;
}) =>
  useQuery<SuccessResponse<BookingListResponse[]>, ErrorResponse>({
    queryKey: ["booking-list", params],
    queryFn: () => BookingService.get(params),
    enabled,
  });
