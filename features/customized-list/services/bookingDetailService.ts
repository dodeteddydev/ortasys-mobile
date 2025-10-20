import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { BookingDetailResponse } from "../types/BookingDetailResponse";

export class BookingDetailService {
  static async get(bookingId: number) {
    return await axiosInstance
      .get<SuccessResponse<BookingDetailResponse>>(`booking/${bookingId}`)
      .then((response) => response.data);
  }
}
