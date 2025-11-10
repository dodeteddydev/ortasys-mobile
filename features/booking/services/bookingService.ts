import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { BookingDetailResponse } from "../types/bookingDetailResponse";
import { BookingHotelQueryParams } from "../types/bookingHotelQueryParams";
import { BookingHotelRoomQueryParams } from "../types/bookingHotelRoomQueryParams";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";
import { BookingListQueryParams } from "../types/bookingListQueryParams";
import { BookingListResponse } from "../types/bookingListResponse";
import { BookingHotelResponse } from "../types/bookingHoteResponse";
import { BookingRequest } from "../types/bookingRequest";

export class BookingService {
  static async get(params?: BookingListQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<BookingListResponse[]>>("hotel/room/booking", {
        params,
      })
      .then((response) => response.data);
  }

  static async create(request: BookingRequest) {
    return await axiosInstance
      .post<SuccessResponse<string>>("booking/agent", request)
      .then((response) => response.data);
  }

  static async getDetail(bookingId: number) {
    return await axiosInstance
      .get<SuccessResponse<BookingDetailResponse>>(`booking/${bookingId}`)
      .then((response) => response.data);
  }

  static async getHotelRoom(
    hotelRoomId: number,
    params?: BookingHotelRoomQueryParams
  ) {
    return await axiosInstance
      .get<SuccessResponse<BookingHotelRoomResponse>>(
        `hotel/room/${hotelRoomId}/booking`,
        {
          params,
        }
      )
      .then((response) => response.data);
  }

  static async getHotel(hotelId: number, params?: BookingHotelQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<BookingHotelResponse[]>>(
        `hotel/${hotelId}/booking`,
        {
          params,
        }
      )
      .then((response) => response.data);
  }
}
