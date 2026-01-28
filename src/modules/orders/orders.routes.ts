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

router.get(
  "/:orderId",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.getOrderDetails,
);

router.post(
  "/",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.orderCreate,
);

export const orderRoutes = router;
