import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { BookingPackageService } from "../services/bookingPackageService";
import { BookingPackageRequest } from "../types/bookingPackageRequest";

export const useBookingPackage = () =>
  useMutation<SuccessResponse<string>, ErrorResponse, BookingPackageRequest>({
    mutationFn: (request) => BookingPackageService.login(request),
  });
