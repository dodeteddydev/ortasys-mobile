import {
  ErrorResponse,
  PaginationResponse,
  SuccessResponse,
} from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../services/reportService";
import { ReportQueryParams } from "../types/reportQueryParams";
import { ReportResponse } from "../types/reportResponse";

export const useGetReport = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: ReportQueryParams;
}) =>
  useQuery<SuccessResponse<PaginationResponse<ReportResponse>>, ErrorResponse>({
    queryKey: ["report", params],
    queryFn: () => ReportService.get(params),
    enabled,
  });
