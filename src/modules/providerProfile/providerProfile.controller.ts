import { providerProfileService } from "./providerProfile.service";
import type { Request, Response } from "express";

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await providerProfileService.getAllProvider();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Failed to fetch providers. Please try again later.",
      details: error,
    });
  }
};

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
  getAllProviders,
};
