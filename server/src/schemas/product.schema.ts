import { z } from "zod";
import { Types } from "mongoose";

export const productSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  sku: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  additionalImages: z.string().array(),
  countInStock: z.number(),
  price: z.number(),
  gender: z.string(),
  brand: z.string(),
  sport: z.string(),
  productType: z.string(),
  category: z.string(),
  sizes: z.string().array(),
  colors: z.string().array(),
  material: z.string().optional(),
  weight: z.string().optional(),
  ratings: z.object({
    count: z.number(),
    average: z.number(),
  }),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type Product = z.infer<typeof productSchema>;

const createNewProduct = z.object({
  body: productSchema.omit({ _id: true, createdAt: true, updatedAt: true }),
});

const getSingleProduct = z.object({
  params: z.object({
    id: z.string({ required_error: "Product id is required" }),
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
    gender: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    brand: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    sport: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    productType: z
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
