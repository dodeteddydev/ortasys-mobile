import { axiosInstance } from "@/services/axiosInstance";
import { SuccessResponse } from "@/types/responseType";
import { ProductCategoryResponse } from "../types/productCategoryResponse";

export class ProductCategoryService {
  static async get() {
    return await axiosInstance
      .get<SuccessResponse<ProductCategoryResponse[]>>("agent/package-category")
      .then((response) => response.data);
  }
}
