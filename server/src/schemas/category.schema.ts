import { z } from "zod";

export const addNewCategoryRequestSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Category name is required." }),
    parentId: z.optional(z.string()),
  }),
});

export const getSingleCategoryRequestSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Category id is required." }),
  }),
});
