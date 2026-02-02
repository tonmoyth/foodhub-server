import { Router } from "express";
import { ordersController } from "./orders.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.getUsersOrders,
);

router.get("/all", auth(UserRole.ADMIN), ordersController.getAllOrders);

router.get(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.getOrderDetails,
);

router.get(
  "/provider/:id",
  auth(UserRole.PROVIDER),
  ordersController.getOrderForProvider,
);

router.post(
  "/",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.orderCreate,
);

export const orderRoutes = router;
