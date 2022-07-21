import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import config from "@utils/config.util";
import { HttpException } from "@utils/custom-errors.util";
import UserModel, { User } from "@models/user.model";

export interface RequestWithUser extends Request {
  user?: Omit<User, "password"> & { _id: Types.ObjectId };
}

const userExtractor = asyncHandler(
  async (request: RequestWithUser, _response: Response, next: NextFunction) => {
    const authorization = request.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        authorization.substring(7),
        config.JWT_SECRET as string
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
