import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "../services/profileService";
import { ProfileResponse } from "../types/profileResponse";

export const useGetProfile = () =>
  useQuery<SuccessResponse<ProfileResponse>, ErrorResponse>({
    queryKey: ["profile"],
    queryFn: () => ProfileService.get(),
  });
