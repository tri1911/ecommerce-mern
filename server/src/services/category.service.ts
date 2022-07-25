import CategoryModel from "@models/category.model";
import ProductModel from "@models/product.model";
import { HttpException } from "@utils/custom-errors.util";

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

const getAllProductsByCategory = async (categoryId: string) => {
  const category = await CategoryModel.findById(categoryId);
  if (category) {
    const childrenIds = await CategoryModel.getAllChildren(category);
    const categoryIds = childrenIds.concat(category._id);
    const products = await ProductModel.find({
      category: { $in: categoryIds },
    });
    return products;
  } else {
    throw new HttpException(
      `The category with id of ${categoryId} cannot not be found`,
      404
    );
  }
};

export default {
  createNewCategory,
  getCategoriesTree,
  getSingleCategory,
  getAllProductsByCategory,
};
