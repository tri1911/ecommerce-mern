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
    currentPage: z.string().optional(),
    pageSize: z.string().optional(),
    sort: z.string().optional(),
  }),
});

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getProductsByCategory,
};
