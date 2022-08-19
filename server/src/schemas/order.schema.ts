import { z } from "zod";
import { userInRequestSchema } from "./user.schema";

const getOrdersByUser = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
  }),
});

const cancelOrder = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
    orderId: z.string(),
  }),
});

const getCancellations = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
  }),
});

export default { getOrdersByUser, cancelOrder, getCancellations };
