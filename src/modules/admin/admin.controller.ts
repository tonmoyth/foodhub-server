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

const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await adminService.updateUserStatus(id as string, status);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "user status update failed, please try again",
      details: e,
    });
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
};
