import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import CategoryModel from "@models/category.model";
import ProductModel, { IProduct } from "@models/product.model";

const getCategoryIds = async (): Promise<Types.ObjectId[]> => {
  const categories = await CategoryModel.find({}).lean();
  return categories.map((cat) => cat._id);
};

type ProductSeed = Omit<IProduct, "_id" | "createdAt" | "updatedAt">;

export function createRandomProduct(
  categoryIds: Types.ObjectId[]
): ProductSeed {
  return {
    sku: faker.datatype.uuid().substring(0, 8),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.imageUrl(696, 460, "shoes", true),
    additionalImages: [],
    countInStock: faker.datatype.number(100),
    price: faker.commerce.price(),
    category:
      categoryIds.length > 0
        ? categoryIds[faker.datatype.number(categoryIds.length)]
        : undefined,
    // brand
    sizes: ["xs", "s", "m", "l", "xl"],
    colors: ["black", "red", "white"],
    material: faker.commerce.productMaterial(),
    weight: faker.datatype.float({ min: 10, max: 100, precision: 0.001 }),
    ratings: {
      count: faker.datatype.number(100),
      average: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
    },
  };
}

const createRandomProducts = async () => {
  const categoryIds = await getCategoryIds();
  const products: ProductSeed[] = [];

  Array.from({ length: 100 }).forEach(() => {
    products.push(createRandomProduct(categoryIds));
  });

  return products;
};

export const insertAllProducts = async () => {
  const products = await createRandomProducts();
  return ProductModel.insertMany(products);
};
