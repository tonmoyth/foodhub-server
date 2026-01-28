import type { orders } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createOrders = async (data: orders) => {
  return await prisma.orders.create({
    data,
  });
};

export const ordersService = {
  createOrders,
};
