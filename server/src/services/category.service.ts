import { HttpException } from "@utils/custom-errors.util";
import CategoryModel from "@models/category.model";
import ProductModel from "@models/product.model";

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
  const category = await CategoryModel.findById(id, { children: 0 });
  return category;
};

export type ProductsFilter = {
  brand?: { $in: string[] };
  sizes?: { $in: string[] };
  colors?: { $in: string[] };
  price?: { $gte: number; $lte: number };
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
}

const getProductsByCategory = async ({
  categoryId,
  currentPage = 1,
  pageSize = 12,
  filter,
  sortQuery,
}: {
  categoryId?: string;
  currentPage?: number;
  pageSize?: number;
  filter: ProductsFilter;
  sortQuery?: Record<string, 1 | -1>;
}) => {
  let categoryFilter = {};

  // generate the category filter if necessary
  if (categoryId) {
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
  }

  // main operation
  const resultAsArray = await ProductModel.aggregate<ProductsByCategoryResult>([
    { $match: categoryFilter },
    { $sort: sortQuery ?? { createdAt: -1 } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        pipeline: [{ $project: { name: 1 } }],
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
        category: { $arrayElemAt: ["$category", 0] },
        sizes: 1,
        colors: 1,
        ratings: 1,
      },
    },
    {
      $facet: {
        products: [
          { $match: filter },
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
        categories: [
          { $sortByCount: "$category" },
          { $set: { _id: "$_id._id", name: "$_id.name" } },
        ],
        brands: [{ $sortByCount: "$brand" }],
        sizes: [{ $unwind: "$sizes" }, { $group: { _id: "$sizes" } }],
        colors: [{ $unwind: "$colors" }, { $group: { _id: "$colors" } }],
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
