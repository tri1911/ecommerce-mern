import { z } from "zod";

export const getProductsRequestSchema = z.object({
  query: z.object({
    page: z.optional(z.string()),
  }),
});

export const getSingleProductRequestSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Product id is required" }),
  }),
});
