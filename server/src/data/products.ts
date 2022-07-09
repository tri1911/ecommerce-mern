import { faker } from "@faker-js/faker";
import { Product } from "../models/product.model";
import { Color, COLORS, SIZES } from "../types";
import { brands } from "./brands";
import { categories } from "./categories";

export const products: Product[] = [];

const colors = Object.keys(COLORS) as Color[];

export function createRandomProduct(): Product {
  const randomBrand = brands[Math.floor(Math.random() * (brands.length - 1))];
  const randomCategory =
    categories[Math.floor(Math.random() * (categories.length - 1))];
  return {
    sku: faker.datatype.string(8).toUpperCase(),
    name: faker.commerce.productName(),
    image: `/images/products/product${faker.datatype.number({
      min: 1,
      max: 12,
    })}.jpg`,
    description: faker.commerce.productDescription(),
    brand: randomBrand.slug,
    category: randomCategory.slug,
    size: SIZES[faker.datatype.number(SIZES.length - 1)],
    color: colors[faker.datatype.number(colors.length - 1)],
    price: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
    rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
    numReviews: faker.datatype.number(500),
    inStockQty: faker.datatype.number(100),
  };
}

Array.from({ length: 36 }).forEach(() => {
  products.push(createRandomProduct());
});
