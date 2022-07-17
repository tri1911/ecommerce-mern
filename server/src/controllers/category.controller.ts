import asyncHandler from "express-async-handler";
import CategoryModel, { Category } from "../models/category.model";

/**
 * Controller Definitions
 */

export const getAllCategories = asyncHandler(async (_request, response) => {
  const categories = await CategoryModel.find({});
  const processedCategories = getCategoriesTree(categories);
  response.status(200).json({ categories: processedCategories });
});

/**
 * Helper functions
 */

type ProcessedCategory = Pick<Category, "name" | "path"> & {
  children: ProcessedCategory[];
};

const getCategoriesTree = (
  categories: Category[],
  parent?: string
): ProcessedCategory[] => {
  const reducer = (
    acc: ProcessedCategory[],
    { _id, name, parent: parentId, path }: Category
  ) => {
    if (parentId?.toString() === parent) {
      acc.push({
        name,
        path,
        children: getCategoriesTree(categories, _id.toString()),
      });
    }
    return acc;
  };
  return categories.reduce(reducer, []);
};
