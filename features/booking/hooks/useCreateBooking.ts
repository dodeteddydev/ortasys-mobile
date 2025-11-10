import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../services/bookingService";
import { BookingRequest } from "../types/bookingRequest";

export const useCreateBooking = () =>
  useMutation<SuccessResponse<string>, ErrorResponse, BookingRequest>({
    mutationFn: (request) => BookingService.create(request),
  });
