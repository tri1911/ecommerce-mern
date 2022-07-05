/**
 * External Modules and Data Model Interfaces
 */

import { faker } from "@faker-js/faker";
import { BaseProduct, Product } from "./product.interface";

/**
 * In-Memory Store
 */

import products from "./products.data";

/**
 * Service Methods
 */

export const findAll = (): Product[] => Object.values(products);

export const find = (id: string): Product => products[id];

export const create = (newProduct: BaseProduct): Product => {
  const id = faker.database.mongodbObjectId();

  products[id] = {
    id,
    ...newProduct,
  };

  return products[id];
};

export const update = (
  id: string,
  productUpdate: BaseProduct
): Product | undefined => {
  const product = find(id);

  if (!product) {
    return undefined;
  }

  products[id] = { id, ...productUpdate };

  return products[id];
};

export const remove = (id: string): undefined | void => {
  const product = find(id);

  if (!product) {
    return undefined;
  }

  delete products[id];
};
