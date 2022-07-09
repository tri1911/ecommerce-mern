import mongoose from "mongoose";
import config from "./config.util";
import logger from "./logger.util";

const connectDB = async () => {
  const uri = config.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing");
  }

  logger.info("Connecting to MongoDB...");

  try {
    const result = await mongoose.connect(uri);
    logger.info(`MongoDB connected: ${result.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error connecting to MongoDB: ", error.message);
    }
    process.exit(1);
  }
};

export default connectDB;
