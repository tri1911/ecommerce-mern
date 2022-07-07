/**
 * Required External Modules and Interfaces
 */

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/user.schema";
import { HttpException } from "../utils/custom-errors.util";
import generateToken from "../utils/generate-token.util";

/**
 * Controller Definition
 */

// @desc Register for new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { body } = userRegistrationSchema.parse(request);
    const { name, email, password } = body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new HttpException("Email already exists", 409);
    }

    const newUser = await UserModel.create({ name, email, password });

    if (newUser) {
      const { _id, name, email, isAdmin } = newUser;
      const token = generateToken(_id.toString());
      response.status(201).json({ _id, name, email, isAdmin, token });
    } else {
      throw new HttpException("Invalid user information", 400);
    }
  }
);

// @desc authenticate user & get token
// @route POST /api/users/login
// @access Public
export const authenticateUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { body } = userLoginSchema.parse(request);
    const { email, password } = body;

    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const { _id, name, email, isAdmin } = user;
      const token = generateToken(_id.toString());
      response.json({ _id, name, email, isAdmin, token });
    } else {
      throw new HttpException("Invalid email or password", 401);
    }
  }
);
