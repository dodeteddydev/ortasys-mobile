import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "../services/profileService";
import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { ProfileResponse } from "../types/profileResponseType";

export const useGetProfile = () =>
  useQuery<SuccessResponse<ProfileResponse>, ErrorResponse>({
    queryKey: ["profile"],
    queryFn: () => ProfileService.get(),
  });
