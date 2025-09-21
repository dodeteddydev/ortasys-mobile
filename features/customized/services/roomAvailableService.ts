import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { RoomAvailableResponse } from "../types/roomAvailableResponse";
import { RoomAvailableQueryParams } from "../types/roomAvailableQueryParams";

export class RoomAvailableService {
  static async get(roomId: number, params?: RoomAvailableQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<RoomAvailableResponse>>(
        `hotel/room/${roomId}/contract/available`,
        {
          params,
        }
      )
      .then((response) => response.data);
  }
}
