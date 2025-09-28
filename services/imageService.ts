import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";

export const getImageUrl = async (path?: string) => {
  return await axiosInstance
    .get<SuccessResponse<string>>("file", {
      params: {
        path,
      },
    })
    .then((response) => response.data);
};
