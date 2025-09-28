import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { CountryResponse } from "../types/countryResponse";

export class CountryService {
  static async get() {
    return await axiosInstance
      .get<SuccessResponse<CountryResponse[]>>("world/country")
      .then((response) => response.data);
  }
}
