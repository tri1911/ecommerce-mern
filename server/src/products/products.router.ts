/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ProductService from "./products.service";
import { BaseProduct, Product } from "./product.interface";

/**
 * Router Definition
 */

export const productsRouter = express.Router();

/**
 * Controller Definition
 */

// GET products

productsRouter.get("/", (_request: Request, response: Response) => {
  try {
    const products: Product[] = ProductService.findAll();
    response.status(200).send(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

// GET products/:id

productsRouter.get("/:id", (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const product: Product = ProductService.find(id);
    if (product) {
      response.status(200).send(product);
    } else {
      response.status(404).send("product not found");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

// POST products

productsRouter.post("/", (request: Request, response: Response) => {
  try {
    const product = request.body as BaseProduct;
    const newProduct = ProductService.create(product);
    response.status(201).json(newProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

// PUT products/:id

productsRouter.put("/:id", (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const productUpdate = request.body as BaseProduct;
    const existingProduct: Product = ProductService.find(id);
    if (existingProduct) {
      const updatedProduct = ProductService.update(id, productUpdate);
      response.status(200).json(updatedProduct);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});

// DELETE products/:id

productsRouter.delete("/:id", (request: Request, response: Response) => {
  try {
    const id: string = request.params.id;
    ProductService.remove(id);
    response.status(204);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    }
  }
});
