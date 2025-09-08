import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileRequest } from "../types/updateProfileRequest";
import { ProfileService } from "../services/profileService";
import { ProfileResponse } from "../types/profileResponse";

export const useUpdateProfile = () =>
  useMutation<
    SuccessResponse<ProfileResponse>,
    ErrorResponse,
    UpdateProfileRequest
  >({
    mutationFn: (request) => ProfileService.update(request),
  });
