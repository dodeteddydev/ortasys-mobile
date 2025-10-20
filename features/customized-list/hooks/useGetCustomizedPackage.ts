import {
  ErrorResponse,
  PaginationResponse,
  SuccessResponse,
} from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { CustomizedPackageService } from "../services/customizedPackageService";
import { CustomizedPackageQueryParams } from "../types/customizedPackageQueryParams";
import { CustomizedPackageResponse } from "../types/customizedPackageResponse";

export const useGetCustomizedPackage = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: CustomizedPackageQueryParams;
}) =>
  useQuery<
    SuccessResponse<PaginationResponse<CustomizedPackageResponse>>,
    ErrorResponse
  >({
    queryKey: ["customized-package", params],
    queryFn: () => CustomizedPackageService.get(params),
    enabled,
  });
