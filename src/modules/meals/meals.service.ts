import type { meals } from "../../../generated/prisma/browser";
import type { OrderStatus } from "../../enum";
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

const updateMealOrderStatus = async (id: string, status: OrderStatus) => {
  return await prisma.orders.update({
    where: {
      id,
    },
    data: {
      status,
    },
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
  updateMealOrderStatus,
  deleteMeal,
};
