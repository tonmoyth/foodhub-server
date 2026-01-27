import { Router } from "express";
import { categoriesController } from "./categories.controller";

const router = Router();
router.post("/", categoriesController.createCategories);
router.patch("/:categorieId", categoriesController.updateCategories);
router.delete("/:categorieId", categoriesController.deleteCategories);

export const categoriesRouter = router;
