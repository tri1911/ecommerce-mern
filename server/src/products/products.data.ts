import { faker } from "@faker-js/faker";
import { Product } from "./product.interface";
import { Products } from "./products.interface";

let products: Products = {};

function createRandomProduct(): Product {
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.food(undefined, undefined, true),
    price: faker.datatype.number({ min: 100, max: 1000 }),
  };
}

Array.from({ length: 5 }).forEach(() => {
  const product = createRandomProduct();
  products[product.id] = product;
});

export default products;
