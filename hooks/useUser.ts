import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function getUser(): Promise<User> {
  const res = await axios.get("api/current");
  return res.data;
}
export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
