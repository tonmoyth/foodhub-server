import type { Request, Response } from "express";
import { categoriesService } from "./categories.service";

const createCategories = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await categoriesService.createCategories(data);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Categories creation failed",
      details: e,
    });
  }
};

const updateCategories = async (req: Request, res: Response) => {
  const { categorieId } = req.params;
  const data = req.body;

  try {
    const result = await categoriesService.updateCategories(
      categorieId as string,
      data,
    );
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Categories update failed",
      details: e,
    });
  }
};

const deleteCategories = async (req: Request, res: Response) => {
  const { categorieId } = req.params;

  try {
    const result = await categoriesService.deleteCategories(
      categorieId as string,
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Categories delete failed",
      details: e,
    });
  }
};

export const categoriesController = {
  createCategories,
  updateCategories,
  deleteCategories,
};
