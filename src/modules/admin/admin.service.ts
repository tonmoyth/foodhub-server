import type { UserStatus } from "../../enum";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany();
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
};
