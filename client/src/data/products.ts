import { faker } from "@faker-js/faker";
import { Product } from "../types";

const TOTAL = 12;

export const products: Product[] = [];

export function createRandomProduct(): Product {
  return {
    _id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    image: `images/products/product${faker.datatype.number({
      min: 1,
      max: TOTAL,
    })}.jpg`,
    price: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
    rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
    reviews: faker.datatype.number(500),
  };
}

Array.from({ length: TOTAL }).forEach(() => {
  products.push(createRandomProduct());
});
