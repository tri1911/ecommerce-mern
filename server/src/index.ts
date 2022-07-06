/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDb from "./utils/connect-db.util";
import errorHandler from "./middlewares/error-handler.middleware";
import notFoundHandler from "./middlewares/not-found.middleware";
import userRouter from "./routes/user.router";
import morgan from "morgan";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

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
app.use("/api/users", userRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await connectDb();
});
