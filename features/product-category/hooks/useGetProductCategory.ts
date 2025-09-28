import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { ProductCategoryService } from "../services/productCategoryService";
import { ProductCategoryResponse } from "../types/productCategoryResponse";

export const useGetProductCategory = ({
  enabled = true,
}: {
  enabled?: boolean;
}) =>
  useQuery<SuccessResponse<ProductCategoryResponse[]>, ErrorResponse>({
    queryKey: ["product-category"],
    queryFn: () => ProductCategoryService.get(),
    enabled,
  });
