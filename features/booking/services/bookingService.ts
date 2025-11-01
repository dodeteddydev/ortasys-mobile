import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { BookingDetailResponse } from "../types/bookingDetailResponse";
import { BookingListQueryParams } from "../types/bookingListQueryParams";
import { BookingListResponse } from "../types/bookingListResponse";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";
import { BookingHotelRoomQueryParams } from "../types/bookingHotelRoomQueryParams";

export class BookingService {
  static async get(params?: BookingListQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<BookingListResponse[]>>("hotel/room/booking", {
        params,
      })
      .then((response) => response.data);
  }

  static async getDetail(bookingId: number) {
    return await axiosInstance
      .get<SuccessResponse<BookingDetailResponse>>(`booking/${bookingId}`)
      .then((response) => response.data);
  }

  static async getHotelRoom(
    roomId: number,
    params?: BookingHotelRoomQueryParams
  ) {
    return await axiosInstance
      .get<SuccessResponse<BookingHotelRoomResponse>>(
        `hotel/room/${roomId}/booking`,
        {
          params,
        }
      )
      .then((response) => response.data);
  }
}
