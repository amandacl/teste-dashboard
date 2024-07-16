import { useQuery } from "@tanstack/react-query";
import { productsService } from "../services/products.service";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => await productsService.getAllProducts(),
    retry: false,
    refetchOnWindowFocus: false,    
  });
}
