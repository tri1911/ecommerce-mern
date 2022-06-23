import { faker } from "@faker-js/faker";
import { Product } from "../types";
import { brands } from "./brands";
import { categories } from "./categories";

const TOTAL = 12;

export const products: Product[] = [];

export function createRandomProduct(): Product {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    image: `images/products/product${faker.datatype.number({
      min: 1,
      max: TOTAL,
    })}.jpg`,
    description: faker.commerce.productDescription(),
    brand: brands[faker.datatype.number(brands.length - 1)].slug,
    category: categories[faker.datatype.number(categories.length - 1)].slug,
    price: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
    rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
    reviews: faker.datatype.number(500),
  };
}

Array.from({ length: TOTAL }).forEach(() => {
  products.push(createRandomProduct());
});
