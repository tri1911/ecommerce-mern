import CategoryModel from "@models/category.model";

const createNewCategory = async (newCategory: {
  name: string;
  parentId?: string;
}) => {
  const createdCategory = await CategoryModel.create(newCategory);
  return createdCategory;
};

const getAllCategories = async () => {
  const categories = await CategoryModel.getChildrenTree();
  return categories;
};

const getSingleCategory = async (id: string) => {
  const category = await CategoryModel.findById(id, { children: 0 });
  return category;
};

export default { createNewCategory, getAllCategories, getSingleCategory };
