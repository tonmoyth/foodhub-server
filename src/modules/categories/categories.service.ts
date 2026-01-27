import type { categories } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createCategories = async (data: categories) => {
  return await prisma.categories.create({
    data,
  });
};

const updateCategories = async (id: string, data: categories) => {
  return await prisma.categories.update({
    where: {
      id,
    },
    data,
  });
};

const deleteCategories = async (id: string) => {
  return await prisma.categories.delete({
    where: {
      id,
    },
  });
};

export const categoriesService = {
  createCategories,
  updateCategories,
  deleteCategories,
};
