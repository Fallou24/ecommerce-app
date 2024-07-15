import { getUserCart } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

export function useUserCart(userId: string) {
  return useQuery({
    queryKey: ["cart", {userId}],
    queryFn: () => getUserCart(userId),
    enabled: Boolean(userId),
  });
}
