import type { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const data = {
      ...req.body,
      customerId: userId,
    };

    const result = await ReviewService.createReview(data);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Review creation failed",
    });
    console.log(error);
  }
};

export const ReviewController = {
  createReview,
};
