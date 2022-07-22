import { faker } from "@faker-js/faker";
import ProductModel from "@models/product.model";
import { Product } from "@schemas/product.schema";

type ProductSeed = Omit<Product, "_id" | "createdAt" | "updatedAt">;

export function createRandomProduct(): ProductSeed {
  return {
    sku: faker.datatype.uuid().substring(0, 8),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.imageUrl(696, 460, "shoes", true),
    additionalImages: [],
    countInStock: faker.datatype.number(100),
    price: parseInt(faker.commerce.price()),
    gender: faker.name.gender(true),
    brand: faker.company.companyName(),
    sport: faker.datatype.string(),
    productType: faker.datatype.string(),
    category: faker.commerce.department(),
    sizes: ["xs", "s", "m", "l", "xl"],
    colors: ["black", "red", "white"],
    material: faker.commerce.productMaterial(),
    weight: `${faker.datatype.float({
      min: 10,
      max: 100,
      precision: 0.001,
    })} kg`,
    ratings: {
      count: faker.datatype.number(100),
      average: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
    },
  };
}

const createRandomProducts = () => {
  const products: ProductSeed[] = [];

  Array.from({ length: 100 }).forEach(() => {
    products.push(createRandomProduct());
  });

  return products;
};

export const insertAllProducts = async () => {
  const products = createRandomProducts();
  return ProductModel.insertMany(products);
};
