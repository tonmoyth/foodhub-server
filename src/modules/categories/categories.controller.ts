import type { Request, Response } from "express";
import { categoriesService } from "./categories.service";

const createCategories = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await categoriesService.createCategories(data);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Category creation failed. Please try again.",
      error: e.message || e,
    });
  }
};

const updateCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await categoriesService.updateCategories(id as string, data);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Category update failed. Please try again.",
      error: e.message || e,
    });
  }
};

const deleteCategories = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await categoriesService.deleteCategories(id as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Category delete failed. Please try again.",
      error: e.message || e,
    });
  }
};

export const categoriesController = {
  createCategories,
  updateCategories,
  deleteCategories,
};
