/**
 * Required External Modules
 */

import express, { Request } from "express";
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
// routes
import authRouter from "@routes/auth.router";
import userRouter from "@routes/user.router";
import productRouter from "@routes/product.router";
import categoryRouter from "@routes/category.router";
import brandRouter from "@routes/brand.router";
import cartRouter from "@routes/cart.router";
import stripeRouter from "@routes/stripe.router";
import orderRouter from "@routes/order.router";
import reviewRouter from "@routes/review.router";

/**
 * App Variables
 */

const app = express();

/**
 * App Configuration
 */

app.use(helmet());
app.use(cors());

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

if (process.env.NODE_ENV === "development") {
  // app.use(morgan("dev"));
  morgan.token("body", (req: Request) => JSON.stringify(req.body));

  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :body"
    )
  );
}

passportSetup();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/carts", authorize(), cartRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

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
