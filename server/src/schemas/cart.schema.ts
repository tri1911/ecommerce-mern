import { z } from "zod";
import { Types } from "mongoose";

const addItemToCart = z.object({
  user: z.object({ _id: z.instanceof(Types.ObjectId) }),
  body: z.object({
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    quantity: z.preprocess((arg) => Number(arg), z.number()),
  }),
});

const updateItemQuantity = z.object({
  user: z.object({ _id: z.instanceof(Types.ObjectId) }),
  body: z.object({
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
    newQuantity: z.preprocess((arg) => Number(arg), z.number()),
  }),
});

const removeCartItem = z.object({
  user: z.object({ _id: z.instanceof(Types.ObjectId) }),
  body: z.object({
    productId: z.preprocess((arg) => {
      if (typeof arg == "string") return new Types.ObjectId(arg);
    }, z.instanceof(Types.ObjectId)),
  }),
});

export default { addItemToCart, updateItemQuantity, removeCartItem };
