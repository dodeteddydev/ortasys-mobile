import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { ProfileResponse } from "../types/profileResponse";
import { UpdateProfileRequest } from "../types/updateProfileRequest";

export class ProfileService {
  static async get() {
    return await axiosInstance
      .get<SuccessResponse<ProfileResponse>>("/auth/me")
      .then((response) => response.data);
  }

  static async update(request: UpdateProfileRequest) {
    return await axiosInstance
      .patch<SuccessResponse<ProfileResponse>>("/auth/me", request)
      .then((response) => response.data);
  }
}
