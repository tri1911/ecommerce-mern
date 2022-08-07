import { z } from "zod";
import { Types } from "mongoose";
import { userInRequestSchema } from "./user.schema";

const getCart = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
  }),
});

const addItemToCart = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
  }),
  body: z.object({
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    quantity: z.preprocess((arg) => Number(arg), z.number()),
  }),
});

const updateItemQuantity = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
  }),
  body: z.object({
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    quantity: z.preprocess((arg) => Number(arg), z.number()),
  }),
});

const removeCartItem = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
  }),
});

const emptyCart = z.object({
  user: userInRequestSchema,
  params: z.object({
    userId: z.string(),
  }),
});

export default {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeCartItem,
  emptyCart,
};
