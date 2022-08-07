import mongoose from "mongoose";
import config from "config";
import logger, { themes } from "@utils/logger.util";

const connectDB = async () => {
  if (config.has("mongodb.uri")) {
    const uri = config.get<string>("mongodb.uri");

    logger.info(themes.info("Connecting to MongoDB..."));

    try {
      const result = await mongoose.connect(uri);
      logger.info(
        themes.success("✓ MongoDB connected at ") +
          themes.success.bold(result.connection.host)
      );
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
      }
      process.exit(1);
    }
  } else {
    throw new Error("MongoDB URI is missing");
  }
};

export default connectDB;
