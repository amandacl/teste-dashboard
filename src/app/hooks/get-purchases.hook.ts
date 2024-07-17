import { useQuery } from "@tanstack/react-query";
import { purchasesService } from "../services/purchases.service";
import { getDate,getDatetime } from "../utils/dateTime.util";
import { IPurchases } from "../interfaces/purchases.interface";

export function useGetPurchases() {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: async () => await purchasesService.getAllPurchases(),
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return (
        data?.map((result: IPurchases,index) => ({          
          id: result.id,
          department: result.department?.name,
          control_number: result.control_number,
          company: result.company,
          created_at: getDatetime(result.created_at),
          request_date: getDate(result.request_date),
          obs: result.obs,
          total_price:result.products[index].price
        })) || []
      );
    },
  });
}
