import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpException } from "../utils/custom-errors.util";
import logger from "../utils/logger.util";

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  logger.error(error.name, error.message);
  if (error instanceof HttpException) {
    return response
      .status(error.statusCode)
      .json({ errorMessage: error.message });
  } else if (error instanceof ZodError) {
    return response.status(400).json({ errorMessages: error.errors });
  } else if (error.name === "CastError") {
    return response.status(400).json({ errorMessage: "mal-formatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ errorMessage: error.message });
  } else {
    return response.status(500).json({ errorMessage: error.message });
  }
};

export default errorHandler;
