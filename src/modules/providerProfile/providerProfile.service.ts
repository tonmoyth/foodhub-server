import type { providerProfile } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const getAllProvider = async () => {
  return await prisma.providerProfile.findMany();
};

const createProviderProfile = async (data: providerProfile) => {
  return await prisma.providerProfile.create({
    data,
  });
};

export const providerProfileService = {
  createProviderProfile,
  getAllProvider,
};
