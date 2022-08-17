import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import productSchemas from "@schemas/product.schema";
import productServices from "@services/product.service";
import reviewServices from "@services/review.service";

const createNewProduct = asyncHandler(async (request, response) => {
  const { body: newProduct } = productSchemas.createNewProduct.parse(request);

  const createdProduct = await productServices.createNewProduct(newProduct);

  response.status(201).json({ status: "success", data: createdProduct });
});

const getSingleProduct = asyncHandler(async (request, response) => {
  const {
    params: { id: productId },
  } = productSchemas.getSingleProduct.parse(request);

  const product = await productServices.getSingleProduct(productId);

  if (product) {
    response.status(200).json(product);
  } else {
    throw new HttpException("product is not found", 404);
  }
});

const updateProduct = asyncHandler(async (request, response) => {
  const {
    params: { id },
    body: data,
  } = productSchemas.updateProduct.parse(request);

  const updatedProduct = await productServices.updateProduct(id, data);

  response.status(204).json({ status: "success", data: updatedProduct });
});

const deleteProduct = asyncHandler(async (request, response) => {
  const {
    params: { id: productId },
  } = productSchemas.deleteProduct.parse(request);

  await productServices.deleteProduct(productId);

  response.status(204).json({ status: "success" });
});

const getNewProducts = asyncHandler(async (req, res) => {
  const {
    query: { limit },
  } = productSchemas.getNewProducts.parse(req);

  const products = await productServices.getProducts({
    pageSize: limit ? Number(limit) : undefined,
    sortQuery: { createdAt: -1 },
    getFacets: false,
  });

  res.status(200).json({ products });
});

// TODO: get proper product recommendations
const getRecommendedProducts = asyncHandler(async (req, res) => {
  const {
    query: { limit },
  } = productSchemas.getRecommendedProducts.parse(req);

  const products = await productServices.getProducts({
    pageSize: limit ? Number(limit) : undefined,
    getFacets: false,
  });

  res.status(200).json({ products });
});

const getTopRatedProducts = asyncHandler(async (req, res) => {
  const {
    query: { limit },
  } = productSchemas.getTopRatedProducts.parse(req);

  const products = await productServices.getProducts({
    pageSize: limit ? Number(limit) : undefined,
    sortQuery: { "ratings.average": -1 },
    getFacets: false,
  });

  res.status(200).json({ products });
});

/**
 * Reviews
 */

const getReviewsByProduct = asyncHandler(async (req, res) => {
  const {
    params: { id },
    body: { sort },
  } = productSchemas.getReviewsByProduct.parse(req);

  const data = await reviewServices.getReviewsByProduct({
    productId: id,
    sort,
  });

  res.status(200).json({ data });
});

export default {
  createNewProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getNewProducts,
  getRecommendedProducts,
  getTopRatedProducts,
  getReviewsByProduct,
};
