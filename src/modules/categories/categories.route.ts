import { Router } from "express";
import { categoriesController } from "./categories.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.PROVIDER),
  categoriesController.getCategories,
);

router.get(
  "/:id",
  auth(UserRole.ADMIN),
  categoriesController.getSingleCategories,
);

router.post("/", auth(UserRole.ADMIN), categoriesController.createCategories);
router.patch("/:id", categoriesController.updateCategories);
router.delete("/:id", categoriesController.deleteCategories);

export const categoriesRouter = router;
