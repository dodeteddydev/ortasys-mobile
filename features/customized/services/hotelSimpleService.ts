import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { HotelSimpleResponse } from "../types/hotelSimpleResponse";

export class HotelSimpleService {
  static async get(params?: {
    search?: string;
    country?: string;
    state?: string;
  }) {
    return await axiosInstance
      .get<SuccessResponse<HotelSimpleResponse[]>>("hotel/simple", {
        params,
      })
      .then((response) => response.data);
  }
}
