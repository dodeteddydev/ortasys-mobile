import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { getImageUrl } from "../services/imageServie";

export const useGetImage = (enabled = true, path?: string) =>
  useQuery<SuccessResponse<string>, ErrorResponse>({
    queryKey: ["image", path],
    queryFn: () => getImageUrl(path),
    enabled,
  });
