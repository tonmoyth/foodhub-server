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

export const ordersController = {
  orderCreate,
};
