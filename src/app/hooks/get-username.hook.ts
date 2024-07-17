import { sessionService } from "../services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useGetUsername() {
  const userId = window?.sessionStorage.getItem("userId") || '';
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await sessionService.getUserById(userId),
    enabled: !!userId,
    retry:false,
    refetchOnWindowFocus: false,
    select:(data)=>data.name
  })
}

