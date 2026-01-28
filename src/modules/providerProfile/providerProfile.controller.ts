import { providerProfileService } from "./providerProfile.service";
import type { Request, Response } from "express";

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await providerProfileService.getAllProvider();

    res.status(200).json({
      success: true,
      message: "Providers fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers. Please try again later.",
      error: error.message || error,
    });
  }
};

const getProviderWithMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await providerProfileService.getProviderWithMenu(
      id as string,
    );

    res.status(200).json({
      success: true,
      message: "Provider details with menu fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Provider not found or failed to fetch details.",
      error: error.message || error,
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

    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Provider profile creation failed. Please try again.",
      error: error.message || error,
    });
  }
};

export const providerController = {
  createProviderProfile,
  getProviderWithMenu,
  getAllProviders,
};
