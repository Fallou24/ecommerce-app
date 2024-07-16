import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
}
