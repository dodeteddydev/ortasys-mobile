import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { StateResponse } from "../types/stateResponseType";

export class StateService {
  static async get(countryCode: string) {
    return await axiosInstance
      .get<SuccessResponse<StateResponse[]>>(`world/${countryCode}/state`)
      .then((response) => response.data);
  }
}
