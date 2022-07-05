/**
 * External Modules and Data Model Interfaces
 */

import { faker } from "@faker-js/faker";
import { BaseProduct, Product } from "./product.interface";
import { Products } from "./products.interface";

/**
 * In-Memory Store
 */

import products from "./products.data";

/**
 * Service Methods
 */

export const findAll = async (): Promise<Product[]> => Object.values(products);

export const find = async (id: string): Promise<Product> => products[id];

export const create = async (newProduct: BaseProduct): Promise<Product> => {
  const id = faker.database.mongodbObjectId();

  products[id] = {
    id,
    ...newProduct,
  };

  return products[id];
};

export const update = async (
  id: string,
  productUpdate: BaseProduct
): Promise<Product | undefined> => {
  const product = await find(id);

  if (!product) {
    return undefined;
  }

  products[id] = { id, ...productUpdate };

  return products[id];
};

export const remove = async (id: string): Promise<undefined | void> => {
  const product = await find(id);

  if (!product) {
    return undefined;
  }

  delete products[id];
};
