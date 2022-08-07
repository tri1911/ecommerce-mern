import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpException } from "@utils/custom-errors.util";
import logger from "@utils/logger.util";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.name, err.message);
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof ZodError) {
    return res.status(400).json({ message: err.errors });
  } else if (err.name === "CastError") {
    return res.status(400).json({ message: "mal-formatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid Token" });
  } else {
    return res.status(500).json({ message: err.message });
  }
};

export default errorHandler;
