import dotenv from "dotenv";
import logger from "@utils/logger.util";
import connectDB from "@utils/connect-db.util";
import CategoryModel from "@models/category.model";
// import UserModel from "@models/user.model";
import ProductModel from "@models/product.model";

import { insertAllCategories } from "./categories";
import { insertAllProducts } from "./products";
// import { insertAllUsers } from "./users";

dotenv.config();

const seedData = async () => {
  await clearDb();
  try {
    logger.info("Seeding data...");
    // await insertAllUsers();
    await insertAllCategories();
    await insertAllProducts();
    logger.info("Data has been populated");
    process.exit(0);
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
    // await UserModel.deleteMany({});
    await CategoryModel.deleteMany({});
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
};

void run();
