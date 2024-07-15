import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { productId, userId, quantity } = req.body;
    const userCart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });
    if (userCart) {
      try {
        const response = await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productId,
            quantity,
          },
        });
        res.status(200).json(response);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const cart = await prisma.cart.create({
          data: {
            userId,
          },
        });
        const response = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        });
        res.status(200).json(response);
      } catch (e) {
        console.log(e);
      }
    }
  }

  // Get current user cart

  if (req.method === "GET") {
    const { userId } = req.query;
    const userCart = await prisma.cart.findUnique({
      where: {
        userId: String(userId),
      },
    });
    try {
      const cart = await prisma.cartItem.findMany({
        where: {
          cartId: userCart?.id,
        },
        include: {
          product: true,
        },
      });
      res.status(200).json(cart);
    } catch (e) {
      console.log(e);
    }
  }

  // Nettoyer le panier

  if (req.method === "DELETE") {
    try {
      const data = await prisma.cartItem.deleteMany();
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}
