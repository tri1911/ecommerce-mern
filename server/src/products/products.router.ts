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

productsRouter.get("/", async (_request: Request, response: Response) => {
  try {
    const products: Product[] = await ProductService.findAll();
    response.status(200).send(products);
  } catch (error: any) {
    response.status(500).send(error.message);
  }
});

// GET products/:id

productsRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const product: Product = await ProductService.find(id);
    if (product) {
      return response.status(200).send(product);
    }
    response.status(404).send("product not found");
  } catch (error: any) {
    response.status(500).send(error.message);
  }
});

// POST products

productsRouter.post("/", async (request: Request, response: Response) => {
  try {
    const product: BaseProduct = request.body;
    const newProduct = await ProductService.create(product);
    response.status(201).json(newProduct);
  } catch (error: any) {
    response.status(500).send(error.message);
  }
});

// PUT products/:id

productsRouter.put("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const productUpdate: BaseProduct = request.body;
    const existingProduct: Product = await ProductService.find(id);
    if (existingProduct) {
      const updatedProduct = await ProductService.update(id, productUpdate);
      return response.status(200).json(updatedProduct);
    }
  } catch (error: any) {
    response.status(500).send(error.message);
  }
});

// DELETE products/:id

productsRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    const id: string = request.params.id;
    await ProductService.remove(id);
    response.status(204);
  } catch (error: any) {
    response.status(500).send(error.message);
  }
});
