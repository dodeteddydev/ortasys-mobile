import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordRequest } from "../types/changePasswordRequest";
import { ChangePasswordService } from "../services/changePasswordService";

export const useChangePassword = () =>
  useMutation<SuccessResponse<boolean>, ErrorResponse, ChangePasswordRequest>({
    mutationFn: (request) => ChangePasswordService.changePassword(request),
  });
