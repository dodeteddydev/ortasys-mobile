import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "../services/profileService";
import { ProfileResponse } from "../types/profileResponse";
import { UpdateProfileRequest } from "../types/updateProfileRequest";

export const useUpdateProfile = () =>
  useMutation<
    SuccessResponse<ProfileResponse>,
    ErrorResponse,
    UpdateProfileRequest
  >({
    mutationFn: (request) => ProfileService.update(request),
  });
