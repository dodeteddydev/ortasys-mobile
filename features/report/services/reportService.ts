import { axiosInstance } from "@/services/axiosInstance";
import { PaginationResponse, SuccessResponse } from "@/types/responseType";
import { ReportQueryParams } from "../types/reportQueryParams";
import { ReportResponse } from "../types/reportResponse";

export class ReportService {
  static async get(params?: ReportQueryParams) {
    return await axiosInstance
      .get<SuccessResponse<PaginationResponse<ReportResponse>>>("report", {
        params,
      })
      .then((response) => response.data);
  }
}
