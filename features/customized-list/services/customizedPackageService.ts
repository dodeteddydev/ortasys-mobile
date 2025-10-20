import { axiosInstance } from "@/services/axiosInstance";
import { PaginationResponse, SuccessResponse } from "@/types/responseType";
import { CustomizedPackageResponse } from "../types/customizedPackageResponse";
import { DefaultQueryParams } from "@/types/queryParamsType";

export class CustomizedPackageService {
  static async get(params?: DefaultQueryParams) {
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
