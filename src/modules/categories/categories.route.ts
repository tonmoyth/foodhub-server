import { Router } from "express";
import { categoriesController } from "./categories.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();
router.post("/", auth(UserRole.ADMIN), categoriesController.createCategories);
router.patch("/:categorieId", categoriesController.updateCategories);
router.delete("/:categorieId", categoriesController.deleteCategories);

export const categoriesRouter = router;
