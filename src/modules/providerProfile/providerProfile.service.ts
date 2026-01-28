import type { providerProfile } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const getAllProvider = async () => {
  return await prisma.providerProfile.findMany();
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
  createProviderProfile,
  getProviderWithMenu,
  getAllProvider,
};
