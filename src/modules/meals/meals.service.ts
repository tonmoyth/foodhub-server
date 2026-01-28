import type { meals } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createMeal = async (data: meals) => {
  console.log(data);
  return await prisma.meals.create({
    data,
  });
};

export const mealsService = {
  createMeal,
};
