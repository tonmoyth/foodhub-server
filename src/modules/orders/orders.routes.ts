import { Router } from "express";
import { ordersController } from "./orders.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.CUSTOMER), ordersController.orderCreate);

export const orderRoutes = router;
