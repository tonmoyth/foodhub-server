import type { meals } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createMeal = async (data: meals) => {
  return await prisma.meals.create({
    data,
  });
};

const updatedMeal = async (data: meals, mealId: string) => {
  return await prisma.meals.update({
    where: {
      id: mealId,
    },
    data,
  });
};

const deleteMeal = async (mealId: string) => {
  return await prisma.meals.delete({
    where: {
      id: mealId,
    },
  });
};

export const mealsService = {
  createMeal,
  updatedMeal,
  deleteMeal,
};
