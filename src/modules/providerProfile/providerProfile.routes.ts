import { Router } from "express";

import { UserRole } from "../../../generated/prisma/enums";
import { providerController } from "./providerProfile.controller";
import auth from "../../middlewares/auth";

const router = Router();
router.get("/", providerController.getAllProviders);
router.get("/:id", providerController.getProviderWithMenu);
router.post(
  "/",
  auth(UserRole.PROVIDER),
  providerController.createProviderProfile,
);

export const providerProfileRouter = router;
