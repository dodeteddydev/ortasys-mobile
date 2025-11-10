import {
  ErrorResponse,
  PaginationResponse,
  SuccessResponse,
} from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { CustomizedPackageService } from "../services/customizedPackageService";
import { CustomizedPackageResponse } from "../types/customizedPackageResponse";
import { DefaultQueryParams } from "@/types/queryParamsType";

export const useGetCustomizedPackage = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: DefaultQueryParams;
}) =>
  useQuery<
    SuccessResponse<PaginationResponse<CustomizedPackageResponse>>,
    ErrorResponse
  >({
    queryKey: ["customized-package", params],
    queryFn: () => CustomizedPackageService.get(params),
    enabled,
  });
