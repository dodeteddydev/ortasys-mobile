import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { ChangePasswordRequest } from "../types/changePasswordRequest";

export class ChangePasswordService {
  static async changePassword(request: ChangePasswordRequest) {
    return await axiosInstance
      .patch<SuccessResponse<boolean>>("auth/me/password", request)
      .then((response) => response.data);
  }
}
