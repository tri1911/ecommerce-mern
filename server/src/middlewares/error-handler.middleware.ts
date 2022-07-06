import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../utils/custom-errors.util";

const errorHandler = (
  error: Error | ApplicationError,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message, error.name);
  if (error instanceof ApplicationError) {
    return response.status(error.status).send({ error: error.message });
  }
  response.status(500).send({ error: error.message });
  return next(error);
};

export default errorHandler;
