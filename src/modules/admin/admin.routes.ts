import { Router } from "express";
import { adminController } from "./admin.controller";
import { UserRole } from "../../../generated/prisma/enums";
import auth from "../../middlewares/auth";

const router = Router();
router.get("/", auth(UserRole.ADMIN), adminController.getAllUsers);

export const adminRouter = router;
