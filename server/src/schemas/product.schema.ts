import { z } from "zod";

export const getSingleProductRequestSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Product id is required" }),
  }),
});

export const getProductsRequestSchema = z.object({
  query: z.object({
    page: z.optional(z.string()),
    size: z.optional(z.string()),
    color: z.optional(z.string()),
  }),
});
