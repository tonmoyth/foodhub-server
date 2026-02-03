import type { providerProfile } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const getAllProvider = async () => {
  return await prisma.providerProfile.findMany();
};

// totalOrders,totalMenu,TotalReview
const getProviderStats = async (id: string) => {
  const getProviderProfileById = await prisma.providerProfile.findMany({
    where: {
      userId: id,
    },
  });
  const providerProfileId = getProviderProfileById[0]?.id;

  if (providerProfileId) {
    return await prisma.$transaction(async (tx) => {
      const [totalOrders, totalMenu] = await Promise.all([
        await tx.orders.count({ where: { providerProfileId } }),
        await tx.meals.count({ where: { providerId: id } }),
      ]);

      return {
        totalOrders,
        totalMenu,
      };
    });
  }
};

const getSignleProvider = async (userId: string) => {
  return await prisma.providerProfile.findFirst({
    where: {
      userId,
    },
  });
};

const getProviderWithMenu = async (id: string) => {
  return await prisma.providerProfile.findMany({
    where: {
      id,
    },
    include: {
      meals: true,
    },
  });
};

const createProviderProfile = async (data: providerProfile) => {
  return await prisma.providerProfile.create({
    data,
  });
};

export const providerProfileService = {
  getSignleProvider,
  createProviderProfile,
  getProviderWithMenu,
  getAllProvider,
  getProviderStats,
};
