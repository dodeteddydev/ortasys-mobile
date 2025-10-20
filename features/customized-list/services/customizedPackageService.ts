import { axiosInstance } from "@/services/axiosInstance";
import { PaginationResponse, SuccessResponse } from "@/types/responseType";
import { CustomizedPackageQueryParams } from "../types/customizedPackageQueryParams";
import { CustomizedPackageResponse } from "../types/customizedPackageResponse";

export class CustomizedPackageService {
  static async get(params?: CustomizedPackageQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<PaginationResponse<CustomizedPackageResponse>>>(
        "agent/package/page",
        {
          params,
        }
      )
      .then((response) => response.data);
  }
}
