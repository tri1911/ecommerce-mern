import { z } from "zod";

const createNewCategory = z.object({
  body: z.object({
    name: z.string({ required_error: "Category Name is required" }),
    parentId: z.optional(z.string()),
  }),
});

const getSingleCategory = z.object({
  params: z.object({
    id: z.string({ required_error: "Category Id is required" }),
  }),
});

export default { createNewCategory, getSingleCategory };
