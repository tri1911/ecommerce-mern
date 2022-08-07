import dotenv from "dotenv";
import logger from "@utils/logger.util";
import connectDB from "configs/mongoose";

import UserModel from "@models/user.model";
import CategoryModel from "@models/category.model";
import BrandModel from "@models/brand.model";
import ProductModel from "@models/product.model";

import { insertAllUsers } from "./users";
import { insertAllCategories } from "./categories";
import { insertAllBrands } from "./brands";
import { insertAllProducts } from "./products";

dotenv.config();

const seedData = async () => {
  await clearDb();
  try {
    logger.info("Seeding data...");
    await insertAllUsers();
    await insertAllCategories();
    await insertAllBrands();
    await insertAllProducts();
    logger.info("Data has been populated");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
};

const clearDb = async () => {
  try {
    logger.info("Clearing database...");
    await UserModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await BrandModel.deleteMany({});
    await ProductModel.deleteMany({});
    logger.info("Database has been cleared");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  if (process.argv[2] === "-d") {
    await clearDb();
  } else {
    await seedData();
  }
  process.exit(0);
};

void run();
