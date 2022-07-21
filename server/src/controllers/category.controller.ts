import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import categorySchemas from "@schemas/category.schema";
import categoryServices from "@services/category.service";

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

const getAllCategories = asyncHandler(async (_request, response) => {
  const categoriesTree = await categoryServices.getAllCategories();

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

export default {
  createNewCategory,
  getAllCategories,
  getSingleCategory,
};
