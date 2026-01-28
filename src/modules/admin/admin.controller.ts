import type { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again later.",
      error: e.message || e,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await adminService.updateUserStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "User status update failed. Please try again.",
      error: e.message || e,
    });
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
};
