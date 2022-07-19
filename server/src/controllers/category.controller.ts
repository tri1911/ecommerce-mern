import asyncHandler from "express-async-handler";
import CategoryModel from "../models/category.model";
import {
  addNewCategoryRequestSchema,
  getSingleCategoryRequestSchema,
} from "../schemas/category.schema";
import { HttpException } from "../utils/custom-errors.util";

export const addNewCategory = asyncHandler(async (request, response) => {
  const {
    body: { name, parentId },
  } = addNewCategoryRequestSchema.parse(request);

  const createdCategory = await CategoryModel.create({ name, parentId });
  response.status(201).json({ createdCategory });
});

export const getAllCategories = asyncHandler(async (_request, response) => {
  const categories = await CategoryModel.getChildrenTree();
  response.status(200).json({ categories });
});

export const getSingleCategory = asyncHandler(async (request, response) => {
  const {
    params: { id },
  } = getSingleCategoryRequestSchema.parse(request);

  const category = await CategoryModel.findById(id).select({ children: 0 });
  if (category) {
    response.status(200).json({ category });
  } else {
    throw new HttpException(`Category with id of ${id} is not found`, 404);
  }
});
