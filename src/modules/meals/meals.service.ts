import type { meals } from "../../../generated/prisma/browser";
import type { mealsWhereInput } from "../../../generated/prisma/models";
import type { OrderStatus } from "../../enum";
import { prisma } from "../../lib/prisma";

const createMeal = async (data: meals) => {
  return await prisma.meals.create({
    data,
  });
};

const getAllMeals = async ({
  search,
  categoriesId,
}: {
  search: string | undefined;
  categoriesId: string | undefined;
}) => {
  const andCondition: mealsWhereInput[] = [];

  andCondition.push({
    is_available: true,
  });

  if (search) {
    andCondition.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (categoriesId) {
    andCondition.push({
      categoriesId,
    });
  }

  const result = await prisma.meals.findMany({
    where: {
      AND: andCondition,
    },
  });
  return result;
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

const getMealDetails = async (mealId: string) => {
  return await prisma.meals.findUnique({
    where: {
      id: mealId,
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
  getMealDetails,
  getAllMeals,
};
