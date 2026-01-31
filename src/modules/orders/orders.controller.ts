import type { Request, Response } from "express";
import { ordersService } from "./orders.service";

const orderCreate = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const orderData = {
    ...req.body,
    customerId: userId,
  };
  console.log(orderData);
  try {
    const result = await ordersService.createOrders(orderData);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Order creation failed. Please try again.",
      error: error.message || error,
    });
  }
};

const getUsersOrders = async (req: Request, res: Response) => {
  const id = req.user?.id;

  try {
    const result = await ordersService.getUsersOrders(id as string);

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch user orders. Please try again.",
      error: error.message || error,
    });
  }
};

const getOrderDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await ordersService.getOrderDetails(id as string);

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Order not found or failed to fetch details.",
      error: error.message || error,
    });
  }
};

export const ordersController = {
  orderCreate,
  getUsersOrders,
  getOrderDetails,
};
