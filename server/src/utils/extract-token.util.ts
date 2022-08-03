import jwt from "jsonwebtoken";
import { Request } from "express";
import { HttpException } from "@utils/custom-errors.util";

const extractToken = (request: Request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.decode(authorization.substring(7));
    if (decodedToken) {
      return decodedToken;
    } else {
      throw new HttpException(
        "Token is missing or does not have id property",
        401
      );
    }
  } else {
    throw new HttpException("User authorization not found", 401);
  }
};

export default extractToken;
