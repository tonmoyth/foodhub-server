import type { Request, Response } from "express";
import { mealsService } from "./meals.service";

const createMeals = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const data = {
    ...req.body,
    providerId: userId,
  };

  try {
    const result = await mealsService.createMeal(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "meal creation failed",
      details: error,
    });
    console.log(error);
  }
};

export const mealsController = {
  createMeals,
};
