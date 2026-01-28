import type { review } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createReview = async (payload: review) => {
  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      mealId: payload.mealId,
      customerId: payload.customerId,
    },
  });

  return result;
};

export const ReviewService = {
  createReview,
};
