import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function getUser(): Promise<User> {
  const user = await axios.get("api/current");
  return user.data;
}
export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
