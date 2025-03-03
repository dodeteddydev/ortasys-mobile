import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileRequest } from "../types/updateProfileRequestType";
import { ProfileService } from "../services/profileService";
import { ProfileResponse } from "../types/profileResponseType";

export const useUpdateProfile = () =>
  useMutation<
    SuccessResponse<ProfileResponse>,
    ErrorResponse,
    UpdateProfileRequest
  >({
    mutationFn: (request) => ProfileService.update(request),
  });
