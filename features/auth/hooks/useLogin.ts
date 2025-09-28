import { LoginService } from "@/features/auth/services/loginService";
import { ErrorResponse, SuccessResponse } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../types/loginResponse";
import { LoginRequest } from "../types/loginRequest";

export const useLogin = () =>
  useMutation<SuccessResponse<LoginResponse>, ErrorResponse, LoginRequest>({
    mutationFn: (request) => LoginService.login(request),
  });
