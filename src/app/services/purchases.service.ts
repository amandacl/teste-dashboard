import { ApiGenericResponse } from "./../interfaces/api-generic-response";
import { IPurchases } from "../interfaces/purchases.interface";
import { api } from "./api";

class PurchasesService {
  public static async getAllPurchases() {
    try {
      const { data } = await api.get<ApiGenericResponse<IPurchases[]>>(
        "purchases/"
      );
      return data.results;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}
export const purchasesService = PurchasesService;
