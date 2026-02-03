import type { UserStatus } from "../../enum";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// allorders,all categories,all providers,total meals
const getStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const [totalOrders, totalCategories, totalProviders, totalMeals] =
      await Promise.all([
        await tx.orders.count(),
        await tx.categories.count(),
        await tx.providerProfile.count(),
        await tx.meals.count(),
      ]);

    return {
      totalCategories,
      totalMeals,
      totalProviders,
      totalOrders,
    };
  });
};

const updateUserStatus = async (id: string, status: UserStatus) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getStats,
};
