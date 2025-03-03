import { LoginService } from "@/features/auth/services/loginService";
import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../types/loginResponseType";
import { LoginRequest } from "../types/loginRequestType";

export const useLogin = () =>
  useMutation<SuccessResponse<LoginResponse>, ErrorResponse, LoginRequest>({
    mutationFn: (request) => LoginService.login(request),
  });
