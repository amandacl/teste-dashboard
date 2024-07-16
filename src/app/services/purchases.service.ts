import { api } from "./api";

class PurchasesService {
  public static async getAllPurchases() {
    try {
      const { data } = await api.get('purchases/');
      console.log(data.results)
      return data.results;
    } catch (error: any) {
      throw error.response.data;
    }
  }

}
export const purchasesService = PurchasesService;
