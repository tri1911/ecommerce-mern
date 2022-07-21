import { z } from "zod";
import { Types } from "mongoose";

const createNewProduct = z.object({
  body: z.object({
    sku: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    additionalImages: z.string().array(),
    countInStock: z.number(),
    price: z.string(),
    category: z.instanceof(Types.ObjectId),
    brand: z.instanceof(Types.ObjectId),
    sizes: z.string().array(),
    colors: z.string().array(),
    material: z.string().optional(),
    weight: z.number().optional(),
    ratings: z.object({
      count: z.number(),
      average: z.number(),
    }),
  }),
});

const getSingleProduct = z.object({
  params: z.object({
    id: z.string({ required_error: "Product id is required" }),
  }),
});

export default { createNewProduct, getSingleProduct };
