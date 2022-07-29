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
    params: { id: categoryId },
    query: { currentPage, pageSize, sort, ...rest },
  } = categorySchemas.getProductsByCategory.parse(request);

  // generate `filter`
  const filter = JSON.parse(
    JSON.stringify(rest).replace(/\b(gte|lte|in)\b/g, (match) => `$${match}`)
  ) as ProductsFilter;

  // generate `sort`
  // sort query is sent from client with format: sort=-createdBy
  let sortQuery: Record<string, 1 | -1> | undefined = undefined;
  if (sort) {
    const firstChar = sort.charAt(0);
    if (["+", "-"].includes(firstChar)) {
      sortQuery = { [sort.substring(1)]: firstChar === "-" ? -1 : 1 };
    } else {
      sortQuery = { [sort]: 1 };
    }
  }

  console.log("sortQuery", sortQuery);

  const result = await categoryServices.getProductsByCategory({
    categoryId,
    filter,
    currentPage: currentPage ? Number(currentPage) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    sortQuery,
  });

  response.status(200).json({ result });
});

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getProductsByCategory,
};
