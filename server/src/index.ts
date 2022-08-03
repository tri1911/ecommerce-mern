/**
 * Required External Modules
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";
import logger, { themes } from "@utils/logger.util";
import connectDB from "@utils/connect-db.util";
import errorHandler from "@middlewares/error-handler.middleware";
import notFoundHandler from "@middlewares/not-found.middleware";
import authRouter from "@routes/auth.router";
import productRouter from "@routes/product.router";
import addressRouter from "@routes/address.router";
import userRouter from "@routes/profile.router";
import categoryRouter from "@routes/category.router";
import passportSetup from "configs/passport";
import authenticateUser from "@middlewares/authenticate-user.middleware";

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
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use("/api/profile", authenticateUser, userRouter);
app.use(
  "/api/addresses",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  authenticateUser,
  addressRouter
);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

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
