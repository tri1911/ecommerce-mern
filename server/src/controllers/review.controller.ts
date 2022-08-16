import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import reviewSchemas from "@schemas/review.schema";
import reviewServices from "@services/review.service";

const createReview = asyncHandler(async (req, res) => {
  const {
    user,
    params: { productId },
    body: { rating, desc },
  } = reviewSchemas.createReview.parse(req);

  const createdReview = await reviewServices.createReview({
    user: user._id,
    product: new Types.ObjectId(productId),
    rating,
    desc,
  });

  res.status(201).json({ createdReview });
});

const updateReview = asyncHandler(async (req, res) => {
  const {
    user,
    params: { productId },
    body: { rating, desc },
  } = reviewSchemas.updateReview.parse(req);

  const updatedReview = await reviewServices.updateReview({
    user: user._id,
    product: new Types.ObjectId(productId),
    rating,
    desc,
  });

  res.status(201).json({ updatedReview });
});

const getAllReviews = asyncHandler(async (_req, res) => {
  const reviews = await reviewServices.getAllReviews();

  res.status(200).json({ reviews });
});

export default {
  createReview,
  updateReview,
  getAllReviews,
};
