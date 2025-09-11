import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { HotelSimpleResponse } from "../types/hotelSimpleResponse";
import { HotelSimpleQueryParams } from "../types/hotelSimpleQueryParams";

export class HotelSimpleService {
  static async get(params?: HotelSimpleQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<HotelSimpleResponse[]>>("hotel/simple", {
        params,
      })
      .then((response) => response.data);
  }
}
