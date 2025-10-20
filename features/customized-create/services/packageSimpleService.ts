import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { PackageSimpleResponse } from "../types/packageSimpleResponse";
import { PackageSimpleQueryParams } from "../types/packageSimpleQueryParams";

export class PackageSimpleService {
  static async get(productId: number, params?: PackageSimpleQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<PackageSimpleResponse[]>>(
        `agent/package-element/${productId}/simple`,
        {
          params,
        }
      )
      .then((response) => response.data);
  }
}
