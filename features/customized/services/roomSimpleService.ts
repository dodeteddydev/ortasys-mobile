import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { RoomSimpleResponse } from "../types/roomSimpleResponse";
import { RoomSimpleQueryParams } from "../types/roomSimpleQueryParams";

export class RoomSimpleService {
  static async get(hotelId: number, params?: RoomSimpleQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<RoomSimpleResponse[]>>(
        `hotel/${hotelId}/room/simple`,
        {
          params,
        }
      )
      .then((response) => response.data);
  }
}
