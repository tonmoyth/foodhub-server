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

const getAllOrders = async () => {
  return await prisma.orders.findMany();
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

const getOrderForProvider = async (id: string) => {
  return await prisma.orders.findMany({
    where: {
      providerProfileId: id,
    },
  });
};

export const ordersService = {
  createOrders,
  getAllOrders,
  getOrderForProvider,
  getUsersOrders,
  getOrderDetails,
};
