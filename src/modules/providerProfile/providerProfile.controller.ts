import { providerProfileService } from "./providerProfile.service";
import type { Request, Response } from "express";

const createProviderProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const data = {
    ...req.body,
    userId,
  };

  try {
    const result = await providerProfileService.createProviderProfile(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "provider profile creation failed",
      details: error,
    });
  }
};

export const providerController = {
  createProviderProfile,
};
