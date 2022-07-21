import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import productSchema from "@schemas/product.schema";
import productService from "@services/product.service";

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

export default { createNewProduct, getSingleProduct };
