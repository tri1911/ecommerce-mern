import asyncHandler from "express-async-handler";
import categoryModel from "../models/category.model";
import ProductModel from "../models/product.model";
import {
  getSingleProductRequestSchema,
  getProductsByCategoryRequestSchema,
} from "../schemas/product.schema";
import { HttpException } from "../utils/custom-errors.util";
import { Types } from "mongoose";

export const getSingleProduct = asyncHandler(async (request, response) => {
  const {
    params: { id: productId },
  } = getSingleProductRequestSchema.parse(request);

  const product = await ProductModel.findById(productId);

  if (product) {
    response.status(200).json(product);
  } else {
    throw new HttpException("Product Not Found", 404);
  }
});

export const getProductsByCategory = asyncHandler(async (request, response) => {
  const {
    query: { page },
    params: { categoryId },
  } = getProductsByCategoryRequestSchema.parse(request);

  let filter = {};

  if (categoryId) {
    const categoryIds = await categoryModel.getAllChildren(categoryId);
    // include the root id as well
    categoryIds.push(new Types.ObjectId(categoryId));
    filter = { category: { $in: categoryIds } };
  }

  const pageSize = 12;
  const currentPage = page ? parseInt(page, 10) : 1;

  const total = await ProductModel.countDocuments(filter);
  const pages = Math.ceil(total / pageSize);
  const products = await ProductModel.find(filter, { title: 1, category: 1 })
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .populate("category", "name");

  response.status(200).json({
    page: currentPage,
    pages,
    total,
    products,
  });
});
