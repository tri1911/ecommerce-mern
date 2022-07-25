import { faker } from "@faker-js/faker";
import BrandModel from "@models/brand.model";
import CategoryModel from "@models/category.model";
import ProductModel from "@models/product.model";
import { Product } from "@schemas/product.schema";
import { Types } from "mongoose";

// type ProductSeed = Omit<Product, "category" | "brand"> & {
//   category: string;
//   brand: string;
// };

const createRandomProducts = (
  categoryIds: Types.ObjectId[],
  brandIds: Types.ObjectId[]
) => {
  const products = Array<Product>();
  Array.from({ length: 100 }).forEach(() => {
    products.push({
      sku: faker.datatype.uuid().substring(0, 8),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: `/images/products/product${faker.datatype.number(12)}.jpg`,
      additionalImages: [],
      countInStock: faker.datatype.number(100),
      price: parseFloat(faker.commerce.price()),
      brand: brandIds[faker.datatype.number(brandIds.length - 1)],
      category: categoryIds[faker.datatype.number(categoryIds.length - 1)],
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
    });
  });

  return products;
};

export const insertAllProducts = async () => {
  const categories = await CategoryModel.find({}).lean();
  const categoryIds = categories.map((category) => category._id);
  const brands = await BrandModel.find({}).lean();
  const brandIds = brands.map((brand) => brand._id);
  const products = createRandomProducts(categoryIds, brandIds);
  return ProductModel.insertMany(products);
};
