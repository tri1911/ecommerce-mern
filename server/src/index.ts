/**
 * Required External Modules
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./utils/config.util";
import logger from "./utils/logger.util";
import connectDB from "./utils/connect-db.util";
import errorHandler from "./middlewares/error-handler.middleware";
import notFoundHandler from "./middlewares/not-found.middleware";
import userRouter from "./routes/auth.router";

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
app.use("/api/auth", userRouter);

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
