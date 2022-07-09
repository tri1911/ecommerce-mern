import { z } from "zod";

export const getProductsSchema = z.object({
  query: z.object({
    page: z.optional(z.string()),
  }),
});
