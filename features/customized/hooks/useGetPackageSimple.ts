import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { PackageSimpleService } from "../services/packageSimpleService";
import { PackageSimpleResponse } from "../types/packageSimpleResponse";
import { PackageSimpleQueryParams } from "../types/packageSimpleQueryParams";

export const useGetPackageSimple = ({
  enabled = true,
  productId,
  params,
}: {
  enabled?: boolean;
  productId: number;
  params?: PackageSimpleQueryParams;
}) =>
  useQuery<SuccessResponse<PackageSimpleResponse[]>, ErrorResponse>({
    queryKey: ["package-simple", productId, params],
    queryFn: () => PackageSimpleService.get(productId, params),
    enabled,
  });
