import type { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch users. Please try again later.",
      details: e,
    });
  }
};

export const adminController = {
  getAllUsers,
};
