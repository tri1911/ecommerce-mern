/**
 * Required External Modules
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";
import logger, { themes } from "@utils/logger.util";
import errorHandler from "@middlewares/error-handler.middleware";
import notFoundHandler from "@middlewares/not-found.middleware";
import authorize from "@middlewares/authorize.middleware";
import connectDB from "configs/mongoose";
import passportSetup from "configs/passport";
import authRouter from "@routes/auth.router";
import userRouter from "@routes/user.router";
import addressRouter from "@routes/address.router";
import productRouter from "@routes/product.router";
import categoryRouter from "@routes/category.router";
import cartRouter from "@routes/cart.router";

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

passportSetup();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/carts", authorize(), cartRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

const port = config.get<string>("server.port");

app.listen(port, async () => {
  logger.info(themes.success(`✓ Listening on port ${port}`));
  await connectDB();
});
