import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { mealsController } from "./meals.controller";

const router = Router();
router.get("/", mealsController.getAllMeals);
router.get("/:id", mealsController.getMealDetails);
router.post("/", auth(UserRole.PROVIDER), mealsController.createMeals);
router.put("/:id", auth(UserRole.PROVIDER), mealsController.updatedMeal);
router.patch(
  "/:id",
  auth(UserRole.PROVIDER),
  mealsController.updateMealOrderStatus,
);
router.delete("/:id", auth(UserRole.PROVIDER), mealsController.deletedMeal);

export const mealsRouter = router;
