import asyncHandler from "express-async-handler";
import categorySchemas from "@schemas/category.schema";
import categoryServices, { ProductsFilter } from "@services/category.service";
import { HttpException } from "@utils/custom-errors.util";

const createNewCategory = asyncHandler(async (request, response) => {
  const {
    body: { name, parentId },
  } = categorySchemas.createNewCategory.parse(request);

  const createdCategory = await categoryServices.createNewCategory({
    name,
    parentId,
  });

  response.status(201).json({ status: "success", data: createdCategory });
});

const getCategoriesTree = asyncHandler(async (request, response) => {
  const { query } = categorySchemas.getCategoriesTree.parse(request);
  const maxDepth = query.maxDepth ? parseInt(query.maxDepth) : undefined;

  const categoriesTree = await categoryServices.getCategoriesTree(maxDepth);

  response.status(200).json({ status: "success", data: categoriesTree });
});

const getSingleCategory = asyncHandler(async (request, response) => {
  const {
    params: { id },
  } = categorySchemas.getSingleCategory.parse(request);

  const category = await categoryServices.getSingleCategory(id);

  if (category) {
    response.status(200).json({ status: "success", data: category });
  } else {
    throw new HttpException(`Category with id of ${id} is not found`, 404);
  }
});

const getProductsByCategory = asyncHandler(async (request, response) => {
  const {
    params: { categoryId },
    query: { page, length, sort, ...rest },
  } = categorySchemas.getProductsByCategory.parse(request);

  const filter = JSON.parse(
    JSON.stringify(rest).replace(/\b(gte|lte|in)\b/, (match) => `$${match}`)
  ) as ProductsFilter;

  const pagination = {
    page: page ? parseInt(page) : undefined,
    length: length ? parseInt(length) : undefined,
  };

  let sortQuery = undefined;
  if (sort) {
    sortQuery = sort.split(",").reduce((acc, field) => {
      const firstChar = field.charAt(0);
      if (["+", "-"].includes(firstChar)) {
        acc[field] = firstChar === "-" ? -1 : 1;
      } else {
        acc[field] = 1;
      }
      return acc;
    }, {} as Record<string, 1 | -1>);
  }

  const result = await categoryServices.getProductsByCategory({
    categoryId,
    filter,
    pagination,
    sortQuery,
  });

  response.status(200).json({ status: "success", data: result });
});

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getProductsByCategory,
};
