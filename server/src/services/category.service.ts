import { Types } from "mongoose";
import { HttpException } from "@utils/custom-errors.util";
import CategoryModel from "@models/category.model";
import productService, { ProductsFilter } from "./product.service";

const createNewCategory = async (newCategory: {
  name: string;
  parentId?: string;
}) => {
  const createdCategory = await CategoryModel.create(newCategory);
  return createdCategory;
};

const getCategoriesTree = async (maxDepth?: number) => {
  const categories = await CategoryModel.getChildrenTree({ maxDepth });
  return categories;
};

const getSingleCategory = async (id: string) => {
  const result = await CategoryModel.aggregate<{
    _id: Types.ObjectId;
    name: string;
    path: string;
    children: { _id: string; name: string }[];
  }>([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "parentId",
        as: "children",
      },
    },
    { $project: { name: 1, path: 1, "children._id": 1, "children.name": 1 } },
  ]);

  if (result.length === 0) {
    throw new HttpException(`Category with id of ${id} is not found`, 404);
  }

  const category = result[0];
  const ancestors = await CategoryModel.getAncestors(category.path);

  return { ...category, ancestors };
};

const getProductsByCategory = async ({
  categoryId,
  secondaryFilter,
  page: currentPage,
  limit: pageSize,
  sortQuery,
}: {
  categoryId: string;
  secondaryFilter: ProductsFilter;
  page?: number;
  limit?: number;
  sortQuery?: Record<string, 1 | -1>;
}) => {
  let categoryFilter = {};

  const category = await CategoryModel.findById(categoryId);
  if (category) {
    const children = await CategoryModel.getAllChildren(category);
    const categoryIds = [...children.map((child) => child._id), category._id];
    categoryFilter = { category: { $in: categoryIds } };
  } else {
    throw new HttpException(
      `The category with id of ${categoryId} cannot not be found`,
      404
    );
  }

  return await productService.getProducts({
    primaryFilter: categoryFilter,
    secondaryFilter,
    currentPage,
    pageSize,
    sortQuery,
  });
};

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getProductsByCategory,
};
