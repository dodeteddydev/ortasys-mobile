import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { ContractResponse } from "../types/contractResponse";
import { ContractQueryParams } from "../types/contractQueryParams";

export class ContractService {
  static async get(roomId: number, params?: ContractQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<ContractResponse[]>>(
        `hotel/room/${roomId}/contract`,
        {
          params,
        }
      )
      .then((response) => response.data);
  }
}
