import { Request } from "express";
import { HttpException } from "@utils/custom-errors.util";

const extractToken = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  } else {
    throw new HttpException("User authorization header is missing", 400);
  }
};

export default extractToken;
