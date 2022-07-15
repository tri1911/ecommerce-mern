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
  const pageSize = 12;
  const { query } = getProductsRequestSchema.parse(request);
  const page = query.page ? parseInt(query.page, 10) : 1;

  const totalCount = await ProductModel.countDocuments({});
  const products = await ProductModel.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  response.json({
    products,
    page,
    pages: Math.ceil(totalCount / pageSize),
  });
});
