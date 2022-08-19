import { z } from "zod";

const createNewCategory = z.object({
  body: z.object({
    name: z.string({ required_error: "Category Name is required" }),
    parentId: z.optional(z.string()),
  }),
});

const getCategoriesTree = z.object({
  query: z.object({
    maxDepth: z.string().optional(),
  }),
});

const getSingleCategory = z.object({
  params: z.object({
    id: z.string({ required_error: "Category Id is required" }),
  }),
});

const getProductsByCategory = z.object({
  params: z.object({
    id: z.string({ required_error: "Category Id is required" }),
  }),
  query: z.object({
    brand: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    sizes: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    colors: z
      .object({
        in: z.string().array(),
      })
      .optional(),
    price: z
      .object({
        gte: z.preprocess((arg) => {
          if (typeof arg == "string") return Number(arg);
        }, z.number().optional()),
        lte: z.preprocess((arg) => {
          if (typeof arg == "string") return Number(arg);
        }, z.number().optional()),
      })
      .optional(),
    page: z.preprocess((arg) => {
      if (typeof arg == "string") return Number(arg);
    }, z.number().optional()),
    limit: z.preprocess((arg) => {
      if (typeof arg == "string") return Number(arg);
    }, z.number().optional()),
    sort: z.string().optional(),
  }),
});

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getProductsByCategory,
};
