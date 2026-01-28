import type { Request, Response } from "express";
import { ordersService } from "./orders.service";

const orderCreate = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const orderData = {
    ...req.body,
    customerId: userId,
  };

  try {
    const result = await ordersService.createOrders(orderData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "create order failed",
      details: error,
    });
  }
};

const getUsersOrders = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const result = await ordersService.getUsersOrders(userId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "get orders failed",
      details: error,
    });
  }
};

const getOrderDetails = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const result = await ordersService.getOrderDetails(orderId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "get order failed",
      details: error,
    });
  }
};

export const ordersController = {
  orderCreate,
  getUsersOrders,
  getOrderDetails,
};
