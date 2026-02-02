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

    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Meal creation failed. Please try again.",
      error: error.message || error,
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

    const Price = Number(req.query.maxPrice);
    const maxPrice = typeof Price === "number" ? Price : undefined;

    const result = await mealsService.getAllMeals({
      search: searchString,
      categoriesId: categoriesId,
      maxPrice,
    });

    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meals. Please try again later.",
      error: error.message || error,
    });
  }
};

const getMealByProvider = async (req: Request, res: Response) => {
  const providerId = req.user?.id;

  try {
    const result = await mealsService.getMealsProvider(providerId as string);

    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch meals. Please try again later.",
      error: error.message || error,
    });
  }
};

const updatedMeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await mealsService.updatedMeal(data, id as string);

    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Meal update failed. Please try again.",
      error: error.message || error,
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

    res.status(200).json({
      success: true,
      message: "Meal order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Status update failed. Please try again.",
      error: error.message || error,
    });
  }
};

const getMealDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await mealsService.getMealDetails(id as string);

    res.status(200).json({
      success: true,
      message: "Meal details fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Meal not found or failed to fetch details.",
      error: error.message || error,
    });
  }
};

const deletedMeal = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await mealsService.deleteMeal(id as string);

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Meal delete failed. Please try again.",
      error: error.message || error,
    });
  }
};

export const mealsController = {
  createMeals,
  getMealByProvider,
  getAllMeals,
  updatedMeal,
  updateMealOrderStatus,
  getMealDetails,
  deletedMeal,
};
