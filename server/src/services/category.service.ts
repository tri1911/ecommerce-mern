import { HttpException } from "@utils/custom-errors.util";
import CategoryModel from "@models/category.model";
import ProductModel from "@models/product.model";
import { Types } from "mongoose";

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

export type ProductsFilter = {
  brand?: { $in: string[] };
  sizes?: { $in: string[] };
  colors?: { $in: string[] };
  price?: { $gte?: number; $lte?: number };
};

interface ProductsByCategoryResult {
  products: Array<{
    title: string;
    image: string;
    countInStock: number;
    price: number;
    brand: string;
    category: { _id: string; name: string };
    sizes: string[];
    colors: string[];
    ratings: { count: number; average: number };
  }>;
  metadata: Array<{
    total: number;
    pageSize: number;
    currentPage: number;
  }>;
  categories: Array<{
    _id: string;
    name: string;
    count: number;
  }>;
  brands: Array<{
    _id: string;
    count: number;
  }>;
  sizes: Array<{ _id: string }>;
  colors: Array<{ _id: string }>;
  price: Array<{ priceRangeMin: number; priceRangeMax: number }>;
}

const getProductsByCategory = async ({
  categoryId,
  filter,
  currentPage = 1,
  pageSize = 12,
  sortQuery,
}: {
  categoryId: string;
  filter: ProductsFilter;
  currentPage?: number;
  pageSize?: number;
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

  // main operation
  const resultAsArray = await ProductModel.aggregate<ProductsByCategoryResult>([
    { $match: categoryFilter },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0, name: 1 } }],
        as: "category",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0, name: 1 } }],
        as: "brand",
      },
    },
    {
      $project: {
        title: 1,
        image: 1,
        countInStock: 1,
        price: 1,
        brand: { $arrayElemAt: ["$brand.name", 0] },
        category: { $arrayElemAt: ["$category.name", 0] },
        sizes: 1,
        colors: 1,
        ratings: 1,
      },
    },
    {
      $facet: {
        products: [
          { $match: filter },
          { $sort: sortQuery ?? { createdAt: -1 } },
          { $skip: pageSize * (currentPage - 1) },
          { $limit: pageSize },
        ],
        metadata: [
          { $match: filter },
          { $count: "total" },
          {
            $addFields: {
              // pages: { $ceil: { $divide: ["$total", pageSize] } },
              pageSize: pageSize,
              currentPage: currentPage,
            },
          },
        ],
        categories: [{ $sortByCount: "$category" }],
        brands: [{ $sortByCount: "$brand" }],
        sizes: [{ $unwind: "$sizes" }, { $group: { _id: "$sizes" } }],
        colors: [{ $unwind: "$colors" }, { $group: { _id: "$colors" } }],
        price: [
          {
            $group: {
              _id: null,
              priceRangeMin: { $min: "$price" },
              priceRangeMax: { $max: "$price" },
            },
          },
          { $project: { _id: 0 } },
        ],
      },
    },
  ]);

  return resultAsArray[0];
};

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getProductsByCategory,
};
