import asyncHandler from "express-async-handler";
import ProductModel from "../models/product.model";
import { getProductsSchema } from "../schemas/product.schema";

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (request, response) => {
  const listPerPage = 12;
  const { query } = getProductsSchema.parse(request);
  const page = query.page ? parseInt(query.page, 10) : 1;

  const totalCount = await ProductModel.countDocuments({});
  const products = await ProductModel.find({})
    .limit(listPerPage)
    .skip(listPerPage * (page - 1));

  response.json({
    products,
    page,
    pages: Math.ceil(totalCount / listPerPage),
  });
});
