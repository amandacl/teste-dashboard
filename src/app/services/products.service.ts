import { ApiGenericResponse } from "../interfaces/api-generic-response";
import { IProducts } from "../interfaces/products.interface";
import { api } from "./api";

class ProductsService {
  public static async getAllProducts() {
    try {
      const { data } = await api.get<ApiGenericResponse<IProducts[]>>(`products/`);      
      return data.results;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}

export const productsService = ProductsService;
