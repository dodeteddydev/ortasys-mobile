import { SuccessResponse } from "@/types/responseType";
import { axiosInstance } from "../../../services/axiosInstance";
import { LoginRequest } from "../types/loginRequestType";
import { LoginResponse } from "../types/loginResponseType";

export class LoginService {
  static async login(request: LoginRequest) {
    return await axiosInstance
      .post<SuccessResponse<LoginResponse>>("/auth/login", request)
      .then((response) => response.data);
  }
}
