import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { mealsController } from "./meals.controller";

const router = Router();
router.post("/", auth(UserRole.PROVIDER), mealsController.createMeals);

export const mealsRouter = router;
