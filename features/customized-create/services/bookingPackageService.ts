import { SuccessResponse } from "@/types/responseType";
import { axiosInstance } from "../../../services/axiosInstance";
import { BookingPackageRequest } from "../types/bookingPackageRequest";

export class BookingPackageService {
  static async login(request: BookingPackageRequest) {
    return await axiosInstance
      .post<SuccessResponse<string>>("/agent/package/booking", request)
      .then((response) => response.data);
  }
}
