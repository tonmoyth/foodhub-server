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

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    const categoriesId =
      typeof req.query.categoriesId === "string"
        ? req.query.categoriesId
        : undefined;

    const result = await mealsService.getAllMeals({
      search: searchString,
      categoriesId: categoriesId,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Failed to fetch meals. Please try again later.",
      details: error,
    });
  }
};

const updatedMeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await mealsService.updatedMeal(data, id as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "meal update failed",
      details: error,
    });
  }
};

const updateMealOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await mealsService.updateMealOrderStatus(
      id as string,
      status,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "status updated failed",
      details: error,
    });
  }
};

const deletedMeal = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await mealsService.deleteMeal(id as string);
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
  getAllMeals,
  updatedMeal,
  updateMealOrderStatus,
  deletedMeal,
};
