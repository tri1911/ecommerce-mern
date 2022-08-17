import { Types } from "mongoose";
import { z } from "zod";
import { userInRequestSchema } from "./user.schema";

const createReview = z.object({
  user: userInRequestSchema,
  params: z.object({
    productId: z.string(),
  }),
  body: z.object({
    order: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    purchasedAt: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    rating: z.number(),
    desc: z.string(),
  }),
});

const updateReview = z.object({
  user: userInRequestSchema,
  params: z.object({
    productId: z.string(),
  }),
  body: z.object({
    rating: z.number(),
    desc: z.string(),
  }),
});

export default { createReview, updateReview };
