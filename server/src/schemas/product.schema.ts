import { Types } from "mongoose";
import { z } from "zod";

const productSchema = z.object({
  sku: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  additionalImages: z.string().array(),
  countInStock: z.number(),
  reservations: z.array(
    z.object({
      userId: z.instanceof(Types.ObjectId),
      quantity: z.number(),
      modifiedAt: z.date(),
    })
  ),
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

const getNewProducts = z.object({
  query: z.object({
    limit: z.string().optional(),
  }),
});

const getRecommendedProducts = z.object({
  query: z.object({
    limit: z.string().optional(),
  }),
});

const getTopRatedProducts = z.object({
  query: z.object({
    limit: z.string().optional(),
  }),
});

export default {
  createNewProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getNewProducts,
  getRecommendedProducts,
  getTopRatedProducts,
};
