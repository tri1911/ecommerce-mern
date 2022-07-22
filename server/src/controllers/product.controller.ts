import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import productSchema from "@schemas/product.schema";
import productService, { ProductsFilter } from "@services/product.service";

const createNewProduct = asyncHandler(async (request, response) => {
  const { body: newProduct } = productSchema.createNewProduct.parse(request);

  const createdProduct = await productService.createNewProduct(newProduct);

  response.status(201).json({ status: "success", data: createdProduct });
});

const getSingleProduct = asyncHandler(async (request, response) => {
  const {
    params: { id: productId },
  } = productSchema.getSingleProduct.parse(request);

  const product = await productService.getSingleProduct(productId);

  if (product) {
    response.status(200).json(product);
  } else {
    throw new HttpException(
      `Product with id of ${productId} is not found`,
      404
    );
  }
});

const updateProduct = asyncHandler(async (request, response) => {
  const {
    params: { id },
    body: data,
  } = productSchema.updateProduct.parse(request);

  const updatedProduct = await productService.updateProduct(id, data);

  response.status(204).json({ status: "success", data: updatedProduct });
});

const deleteProduct = asyncHandler(async (request, response) => {
  const {
    params: { id: productId },
  } = productSchema.deleteProduct.parse(request);

  await productService.deleteProduct(productId);

  response.status(204).json({ status: "success" });
});

const getAllProducts = asyncHandler(async (request, response) => {
  const {
    query: { page, length, sort, ...rest },
  } = productSchema.getAllProducts.parse(request);

  const filter = JSON.parse(
    JSON.stringify(rest).replace(/\b(gte|lte|in)\b/g, (match) => `$${match}`)
  ) as ProductsFilter;

  const pagination = {
    page: page ? parseInt(page) : undefined,
    length: length ? parseInt(length) : undefined,
  };

  const sortQuery = sort ? sort.split(",").join(" ") : undefined;

  const products = await productService.getAllProducts({
    filter,
    pagination,
    sortQuery,
  });

  response.status(200).json({ status: "success", data: products });
});

export default {
  createNewProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
