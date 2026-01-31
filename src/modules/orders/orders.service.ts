import type { orders } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createOrders = async (data: orders) => {
  return await prisma.orders.create({
    data,
  });
};

const getUsersOrders = async (id: string) => {
  return await prisma.orders.findMany({
    where: {
      customerId: id,
    },
  });
};

const getOrderDetails = async (id: string) => {
  return await prisma.orders.findUnique({
    where: {
      id,
    },
    include: {
      provider: true,
    },
  });
};

export const ordersService = {
  createOrders,
  getUsersOrders,
  getOrderDetails,
};
