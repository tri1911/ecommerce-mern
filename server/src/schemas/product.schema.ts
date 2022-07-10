import { z } from "zod";

export const getProductsSchema = z.object({
  query: z.object({
    page: z.optional(z.string()),
  }),
});

export const getProductByIdSchema = z.object({
  params: z.object({ id: z.string({ required_error: "id is required" }) }),
});
