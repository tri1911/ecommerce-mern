/**
 * Required External Modules and Interfaces
 */

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel, { IUser } from "../models/user.model";
import { ApplicationError } from "../utils/custom-errors.util";
import generateToken from "../utils/generate-token.util";

type CustomRequest<T> = Request<
  Record<string, never>,
  Record<string, never>,
  T
>;

/**
 * Controller Definition
 */

// @desc Register for new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(
  async (request: CustomRequest<Omit<IUser, "_id">>, response: Response) => {
    const { name, email, password } = request.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new ApplicationError("Email already exists", 400);
    }

    const newUser = await UserModel.create({ name, email, password });

    if (newUser) {
      const { _id, name, email, isAdmin } = newUser;
      const token = generateToken(_id.toString());
      response.status(201).json({ _id, name, email, isAdmin, token });
    } else {
      throw new ApplicationError("Invalid user information", 400);
    }
  }
);

// @desc authenticate user & get token
// @route POST /api/users/login
// @access Public
export const authenticateUser = asyncHandler(
  async (request: CustomRequest<Partial<IUser>>, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new ApplicationError("Important info missing", 400);
    }

    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const { _id, name, email, isAdmin } = user;
      const token = generateToken(_id.toString());
      response.json({ _id, name, email, isAdmin, token });
    } else {
      throw new ApplicationError("Invalid email or password", 401);
    }
  }
);
