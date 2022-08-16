import { z } from "zod";
import { userInRequestSchema } from "./user.schema";

const createReview = z.object({
  user: userInRequestSchema,
  params: z.object({
    productId: z.string(),
  }),
  body: z.object({
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
