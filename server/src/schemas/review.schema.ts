import { Types } from "mongoose";
import { z } from "zod";
import { userInRequestSchema } from "./user.schema";

const createReview = z.object({
  user: userInRequestSchema,
  body: z.object({
    orderId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    purchasedAt: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    productRating: z.number(),
    sellerRating: z.number(),
    deliveryRating: z.number(),
    desc: z.string(),
  }),
});

const updateReview = z.object({
  user: userInRequestSchema,
  body: z.object({
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    productRating: z.number(),
    sellerRating: z.number(),
    deliveryRating: z.number(),
    desc: z.string(),
  }),
});

export default { createReview, updateReview };
