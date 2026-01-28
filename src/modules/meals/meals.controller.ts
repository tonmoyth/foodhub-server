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
  }
};

const updatedMeal = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  const data = req.body;

  try {
    const result = await mealsService.updatedMeal(data, mealId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "meal update failed",
      details: error,
    });
  }
};

const deletedMeal = async (req: Request, res: Response) => {
  const { mealId } = req.params;

  try {
    const result = await mealsService.deleteMeal(mealId as string);
    res.status(204).json(result);
  } catch (error) {
    res.status(400).json({
      error: "meal deleted failed",
      details: error,
    });
  }
};

export const mealsController = {
  createMeals,
  updatedMeal,
  deletedMeal,
};
