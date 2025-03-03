import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { CityResponse } from "../types/cityResponseType";

export class CityService {
  static async get(countryCode: string, stateCode: string) {
    return await axiosInstance
      .get<SuccessResponse<CityResponse[]>>(
        `world/${countryCode}/${stateCode}/city`
      )
      .then((response) => response.data);
  }
}
