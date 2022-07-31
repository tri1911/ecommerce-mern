/**
 * Required External Modules
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "@utils/config.util";
import logger from "@utils/logger.util";
import connectDB from "@utils/connect-db.util";
import errorHandler from "@middlewares/error-handler.middleware";
import notFoundHandler from "@middlewares/not-found.middleware";
import userExtractor from "@middlewares/extract-user.middleware";
import authRouter from "@routes/auth.router";
import productRouter from "@routes/product.router";
import addressRouter from "@routes/address.router";
import userRouter from "@routes/profile.router";
import categoryRouter from "@routes/category.router";

/**
 * App Variables
 */

const app = express();

/**
 * App Configuration
 */

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/profile", userExtractor, userRouter);
app.use("/api/addresses", userExtractor, addressRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

const port = config.PORT || 3001;

app.listen(port, async () => {
  logger.info(`Listening on port ${port}`);
  await connectDB();
});
