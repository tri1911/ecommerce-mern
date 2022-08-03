import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import config from "config";
import { HttpException } from "@utils/custom-errors.util";
import UserModel from "@models/user.model";
import { User } from "@schemas/user.schema";

export interface RequestWithUser extends Request {
  user?: Omit<User, "password"> & { _id: Types.ObjectId };
}

const userExtractor = asyncHandler(
  async (request: RequestWithUser, _response: Response, next: NextFunction) => {
    const authorization = request.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const jwtSecret = config.get<string>("jwt.secret");
      const decodedToken = jwt.verify(
        authorization.substring(7),
        jwtSecret
      ) as { id?: string };
      if (decodedToken && decodedToken.id) {
        request.user = await UserModel.findById(
          decodedToken.id,
          "-password"
        ).lean();
      } else {
        throw new HttpException(
          "Token is missing or does not have id property",
          401
        );
      }
    } else {
      throw new HttpException("User authorization not found", 401);
    }

    next();
  }
);

export default userExtractor;
