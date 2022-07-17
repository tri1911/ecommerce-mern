import asyncHandler from "express-async-handler";
import ProductModel from "../models/product.model";
import {
  getSingleProductRequestSchema,
  getProductsRequestSchema,
} from "../schemas/product.schema";
import { HttpException } from "../utils/custom-errors.util";

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

export const getProducts = asyncHandler(async (request, response) => {
  const {
    query: { page },
  } = getProductsRequestSchema.parse(request);

  const pageSize = 12;
  const currentPage = page ? parseInt(page, 10) : 1;

  const total = await ProductModel.countDocuments({});
  const pages = Math.ceil(total / pageSize);

  const products = await ProductModel.find({})
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1));

  response
    .status(200)
    .json({ page: currentPage, pages, total, data: products });
});
