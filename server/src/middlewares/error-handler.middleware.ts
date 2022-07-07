import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpException } from "../utils/custom-errors.util";
import logger from "../utils/logger.util";

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message, error.name);
  if (error instanceof HttpException) {
    return response.status(error.statusCode).send({ error: error.message });
  } else if (error instanceof ZodError) {
    return response.status(400).send({ errors: error.errors });
  }
  response.status(500).send({ error: error.message });
  return next(error);
};

export default errorHandler;
