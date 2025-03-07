import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { ListHotelResponse } from "../types/lisHotelResponseType";
import { ListHotelParams } from "../types/lisHotelParamsType";

export class HomeService {
  static async getListHotel(params: ListHotelParams) {
    return await axiosInstance
      .get<SuccessResponse<ListHotelResponse[]>>("hotel/room/booking", {
        params: params,
      })
      .then((response) => response.data);
  }
}
