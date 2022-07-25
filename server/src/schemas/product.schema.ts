import { Types } from "mongoose";
import { z } from "zod";

const productSchema = z.object({
  sku: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  additionalImages: z.string().array(),
  countInStock: z.number(),
  price: z.number(),
  brand: z.preprocess((arg) => {
    if (typeof arg == "string") return new Types.ObjectId(arg);
  }, z.instanceof(Types.ObjectId)),
  category: z.preprocess((arg) => {
    if (typeof arg == "string") return new Types.ObjectId(arg);
  }, z.instanceof(Types.ObjectId)),
  sizes: z.string().array(),
  colors: z.string().array(),
  material: z.string().optional(),
  weight: z.string().optional(),
  ratings: z.object({
    count: z.number(),
    average: z.number(),
  }),
});

export type Product = z.infer<typeof productSchema>;

const createNewProduct = z.object({
  body: productSchema,
});

const getSingleProduct = z.object({
  params: z.object({
    id: z.string({ required_error: "Product Id is required" }),
  }),
});

const updateProduct = z.object({
  params: z.object({
    id: z.string({ required_error: "Product Id is required" }),
  }),
  body: productSchema.partial(),
});

const deleteProduct = z.object({
  params: z.object({
    id: z.string({ required_error: "Product Id is required" }),
  }),
});

const getAllProducts = z.object({
  query: z.object({
    brand: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    category: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    size: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    color: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    price: z
      .object({
        gte: z.string(),
        lte: z.string(),
      })
      .optional(),
    page: z.string().optional(),
    length: z.string().optional(),
    sort: z.string().optional(),
  }),
});

export default {
  createNewProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
