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

export type ProductsPagination = { page?: number; length?: number };

const getProductsByCategory = async ({
  categoryId,
  filter,
  pagination: { length, page },
  sortQuery,
}: {
  categoryId?: string;
  filter: ProductsFilter;
  pagination: ProductsPagination;
  sortQuery?: Record<string, 1 | -1>;
}) => {
  let categoryFilter = {};

  if (categoryId) {
    const category = await CategoryModel.findById(categoryId);
    if (category) {
      const childrenIds = await CategoryModel.getAllChildren(category);
      const categoryIds = childrenIds.concat(category._id);
      categoryFilter = { category: { $in: categoryIds } };
    } else {
      throw new HttpException(
        `The category with id of ${categoryId} cannot not be found`,
        404
      );
    }
  }

  const pageSize = length || 12;
  const pageIndex = page || 1;

  const result = await ProductModel.aggregate([
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
        pipeline: [{ $project: { name: 1 } }],
        as: "brand",
      },
    },
    {
      $project: {
        title: 1,
        price: 1,
        ratings: 1,
        sizes: 1,
        colors: 1,
        category: { $arrayElemAt: ["$category", 0] },
        brand: { $arrayElemAt: ["$brand", 0] },
      },
    },
    {
      $facet: {
        products: [
          { $match: filter },
          { $skip: pageSize * (pageIndex - 1) },
          { $limit: pageSize },
        ],
        metadata: [
          { $match: filter },
          { $count: "total" },
          {
            $addFields: {
              pages: { $ceil: { $divide: ["$total", pageSize] } },
            },
          },
        ],
        categories: [{ $sortByCount: "$category" }],
        brands: [{ $sortByCount: "$brand" }],
        sizes: [{ $unwind: "$sizes" }, { $group: { _id: "$sizes" } }],
        colors: [{ $unwind: "$colors" }, { $group: { _id: "$colors" } }],
      },
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getProductsByCategory,
};
