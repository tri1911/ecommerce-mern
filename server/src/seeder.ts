import users from "./data/users";
import { products } from "./data/products";

import ProductModel from "./models/product.model";
import UserModel from "./models/user.model";

import dotenv from "dotenv";
import connectDB from "./utils/connect-db.util";
import logger from "./utils/logger.util";

dotenv.config();

const importData = async () => {
  try {
    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});

    const insertedUsers = await UserModel.insertMany(users);
    const adminUser = insertedUsers[0];
    const productsToInsert = products.map((product) => ({
      ...product,
      user: adminUser._id,
    }));
    await ProductModel.insertMany(productsToInsert);
    logger.info("Data imported!");
    process.exit();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message ?? ""}`);
    }
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});
    logger.info("Data destroyed!");
    process.exit();
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message ?? ""}`);
    }
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();
  if (process.argv[2] === "-d") {
    void destroyData();
  } else {
    void importData();
  }
};

void main();
