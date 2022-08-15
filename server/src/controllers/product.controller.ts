import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import productSchema from "@schemas/product.schema";
import productServices from "@services/product.service";

const createNewProduct = asyncHandler(async (request, response) => {
  const { body: newProduct } = productSchema.createNewProduct.parse(request);

  const createdProduct = await productServices.createNewProduct(newProduct);

  response.status(201).json({ status: "success", data: createdProduct });
});

const getSingleProduct = asyncHandler(async (request, response) => {
  const {
    params: { id: productId },
  } = productSchema.getSingleProduct.parse(request);

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
  } = productSchema.updateProduct.parse(request);

  const updatedProduct = await productServices.updateProduct(id, data);

  response.status(204).json({ status: "success", data: updatedProduct });
});

const deleteProduct = asyncHandler(async (request, response) => {
  const {
    params: { id: productId },
  } = productSchema.deleteProduct.parse(request);

  await productServices.deleteProduct(productId);

  response.status(204).json({ status: "success" });
});

const getNewProducts = asyncHandler(async (req, res) => {
  const {
    query: { limit },
  } = productSchema.getNewProducts.parse(req);

  const products = await productServices.getProducts({
    pageSize: limit ? Number(limit) : undefined,
    sortQuery: { createdAt: -1 },
    getFacets: false,
  });

  res.status(200).json({ products });
});

export default {
  createNewProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getNewProducts,
};
